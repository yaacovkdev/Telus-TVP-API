const db = require("knex")(require("../knexfile"));
const { uuid } = require("uuidv4");

const active_sessions = [];

//every 15 minutes there will be a scan of sessions
const TIME_INTERVAL = 1 * 5 * 1000;
const SESSIONS_MAX = 10000;
setInterval(() => {
  for(let i = 0; i < active_sessions.length; i++) {
    if(active_sessions[i]["recent_use"] === true) {
      active_sessions[i]["recent_use"] = false;
      console.log(`Session ${active_sessions[i]["id"]} set to inactive.`);
    }
    else console.log(`Closed active session: ${active_sessions.splice(i,1)[0]["id"]}.`);
    
  }
}, TIME_INTERVAL);

//Authenticates Signup
const authenticateSignup = (req, res, next) => {
  for(let i = 0; i < active_sessions.length; i++) {
    if(active_sessions[i]["id"] === req.params.id) {
      res.status(400).json({Error: "Session in progress."});
      return;
    }
  }
  next();
}

const list = async(_req, res) => {
  try {
    const response = await db("tvshows").select("*");
    console.log(response);
    res.status(200).json(response);
  } catch(error) {
    res.status(400).send(error);
  }
}

const idSignup = async(req, res) => {
  if(active_sessions.length > SESSIONS_MAX) {
    res.status(507).json({Error: "Too many sessions active"});
  }
  const id = req.params.id;
  const hashkey = uuid();
  active_sessions.push({id: id, key: hashkey, recent_use: true});
  console.log(hashkey);
  try {
    res.status(200).json({key: hashkey});
  } catch(error) {
    res.status(400).json({Error: error});
  }
}

const idSession = async(req, res) => {
  const id = req.params.id;
  try {

  } catch(error) {

  }
}



module.exports = {
  list,
  idSignup,
  idSession,
  authenticateSignup
}
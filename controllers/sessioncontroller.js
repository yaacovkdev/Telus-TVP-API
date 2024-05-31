const db = require("knex")(require("../knexfile"));const active_sessions = [];
const { uuid } = require("uuidv4");
const jwt = require("jsonwebtoken");

//every 15 minutes there will be a scan of sessions
const TIME_INTERVAL = 15 * 60 * 1000;
const SESSIONS_MAX = 10000;
const JWT_KEY = "84b5641573f5e73af3fc6c0857d3e17a6476d29354769a7acf742ce42577fb97";

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

//Authorize id route
function authorize(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No JWT provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_KEY);
    req["decodedToken"] = decodedToken;
    next();
  } catch (err) {
    return res.status(498).json({ message: "Token validation failed" });
  }
}

const idSignup = async(req, res) => {
  if(active_sessions.length > SESSIONS_MAX) {
    res.status(507).json({Error: "Too many sessions active"});
  }
  const id = req.params.id;
  const token = jwt.sign({ id: id }, JWT_KEY);
  active_sessions.push({id: id, token: token["token"], movies: [], recent_use: true});
  try {
    res.status(200).json({ token });
  } catch(error) {
    res.status(400).json({Status: error});
  }
}

//finish later
const idSession = async(req, res) => {
  const id = req.decodedToken.id;
  console.log(req.query.name);
  try {
    
  } catch(error) {

  }
}

module.exports = {
  authenticateSignup,
  authorize,
  idSignup,
  idSession
}
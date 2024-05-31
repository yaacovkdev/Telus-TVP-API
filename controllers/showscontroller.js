const db = require("knex")(require("../knexfile"));

const list = async(_req, res) => {
  try {
    const response = await db("tvshows").select("*");
    console.log(response);
    res.send(response);
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  list
}
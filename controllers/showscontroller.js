const db = require("knex")(require("../knexfile"));

const list = async (req, res) => {
  const query = req.query.query;
  try {
    let response;
    if (query) {
      response = await db("tvshows")
        .where('name', 'like', `%${query}%`)
        .orWhere('original_name', 'like', `%${query}%`);
    } else {
      response = await db("tvshows").select("*");
    }
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the shows.");
  }
};

module.exports = {
  list
};

const db = require("knex")(require("../knexfile"));

const list = async (req, res) => {
  const showname = req.query.name;
  try {
    let response;
    if (showname) {
      response = await db("tvshows")
        .where('name', 'like', `%${showname}%`)
        .orWhere('original_name', 'like', `%${showname}%`);
    } else {
      response = await db("tvshows").select("*");
    }
    res.status(200).json(response);
  } catch(error) {
    console.error(error);
    res.status(500).json({Error: "An error occurred while retrieving the shows."});
  }
};

module.exports = {
  list,
}

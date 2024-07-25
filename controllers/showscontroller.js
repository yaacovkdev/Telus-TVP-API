const db = require("knex")(require("../knexfile"));

const list = async (req, res) => {
  const showname = req.query.name;
  try {
    let response;
    console.log(showname);
    if(showname === "*") {
      response = await db("tvshows").select("id", "name", "channel");
    }
    else if (showname) {
      response = await db("tvshows")
        .select("id", "name", "channel")
        .where("name", "like", `%${showname}%`)
        .orWhere("original_name", "like", `%${showname}%`);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Error: "An error occurred while retrieving the shows." });
  }
};

module.exports = {
  list,
};

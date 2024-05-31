/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
let tv_shows_data = require("../data/shows.json");

function stringifyData(data) {
  for(let i = 0; i< data.length; i++){
    data[i]["genres"] = JSON.stringify(data[i]["genres"]).replace(/[\[\]\"]/g, "");
    data[i]["origin_country"] = JSON.stringify(data[i]["origin_country"]).replace(/[\[\]\"]/g, "");
  }
  return data;
}

tv_shows_data = stringifyData(tv_shows_data);

exports.seed = async function (knex) {
  await knex("tvshows").del();
  await knex("tvshows").insert(tv_shows_data);
};

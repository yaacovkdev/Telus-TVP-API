/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("tvshows", (table) => {
    table.increments("id").primary();
    table.string("genres");
    table.string("origin_country").notNullable();
    table.string("original_language").notNullable();
    table.string("original_name").notNullable();
    table.string("overview").notNullable();
    table.float("popularity").notNullable();
    table.string("first_air_date").notNullable();
    table.string("name").notNullable();
    table.string("channel").notNullable();
    table.float("vote_average").notNullable();
    table.integer("vote_count").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tvshows");
};

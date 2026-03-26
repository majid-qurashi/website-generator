const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "website_generator",
  password: "#MAHJOOR",
  port: 5432,
});

module.exports = pool;
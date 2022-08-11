const mysql = require('mysql2/promise');
const config = require('./config');
require('dotenv').config();

async function query(sql, params) {
  const connection = await mysql.createConnection(config.mysql);
  const [result, ] = await connection.execute(sql, params);

  return result;
}

module.exports = { query };

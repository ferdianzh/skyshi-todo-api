require('dotenv').config();

const config = {
  development : {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  },
}

module.exports = config;

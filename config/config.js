module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.HOSTNAME || 'remotemysql.com',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.HOSTNAME || 'remotemysql.com',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
  },
};

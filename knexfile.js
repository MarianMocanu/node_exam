const credentials = require('./config/mysqlCredentials.js');

const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'exam.caxgh3chpvut.us-east-2.rds.amazonaws.com',
      database: credentials.database,
      user: credentials.user,
      password: credentials.password
    },
    ...knexSnakeCaseMappers()
  }

};

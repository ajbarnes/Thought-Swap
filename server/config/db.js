const keys = require('./keys')

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'data/dev-db.sqlite3',
    operatorsAliases: false,
    logging: () => {},
  },
  test: {
    dialect: 'sqlite',
    storage: 'data/test-db.sqlite3',
    operatorsAliases: false,
  },
  staging: {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: keys.databaseUser,
    password: keys.databasePassword,
    database: keys.databaseName,
    operatorsAliases: false,
    logging: () => {},
  },
  production: {
    dialect: 'mysql', 
    host: '127.0.0.1',
    username: keys.databaseUser,
    password: keys.databasePassword,
    database: keys.databaseName,
    operatorsAliases: false,
    logging: () => {},
  }
}

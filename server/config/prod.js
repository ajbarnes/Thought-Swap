module.exports = {
  port: '80',
  environment: 'production',
  cookieKey: process.env.COOKIE_KEY,
  databaseName: process.env.TS_DB_NAME,
  databaseUser: process.env.TS_DB_USER,
  databasePassword: process.env.TS_DB_PASSWORD
}

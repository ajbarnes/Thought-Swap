const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const app = express()

// Internal Dependencies
// require('./models/User') // Models must be defined first
// require('./services/passport')
const keys = require('./config/keys')

// Configure app to connect to our specified database
// TODO

// Configure all nessessary middleware + routing implementations
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day(s)
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// require('./routes/authRoutes')(app) // Routes must be defined after other deps

// Configure express to handle routing correctly in production
if (keys.environment === 'production') {
  const path = require('path')
  // Point express to react build files like main.js and main.css
  app.use(express.static(path.join(__dirname, '../client/build')))
  // Point express to react's index.html for routes not handled by express
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Configure express to recieve connections on the specified port
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log('listening on *:', PORT))

// Make the open connection available to tests so it can be closed
module.exports = {
  connection: server,
  app: app
}

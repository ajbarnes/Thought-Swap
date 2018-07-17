const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const flash = require('connect-flash')
const passport = require('passport')

// Configure App Environment Variables
const keys = require('./config/keys')

// Configure all nessessary middleware
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day(s)
    keys: [keys.cookieKey]
  })
)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// Internal Dependencies: Database -> Models -> Services -> Routes
const db = require('./models')
const orm = require('./services/database.service')(db.sequelize)
require('./services/authentication.service')(passport, orm)

require('./routes/authentication.routes')(app)

// ~ Configure express to handle routing correctly in production
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
const connection = app.listen(keys.port, () =>
  console.info('Server started listening on *:', keys.port)
)

// Configure socket.io with all the events we want to listen for
const server = require('http').createServer(app)
const io = require('socket.io')(server)
require('./services/sockets.service')(io)

// Make the open connections available to tests so they can be closed
module.exports = {
  app: connection,
  sockets: io
}

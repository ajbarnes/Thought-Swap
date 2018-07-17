const LocalStrategy = require('passport-local').Strategy
const { comparePass } = require('./crypto.service')

module.exports = (passport, db) => {
  passport.serializeUser((user, done) => {
    return done(null, user)
  })

  passport.deserializeUser(async (session, done) => {
    const user = await db.getUser(session.username)
    return done(null, user)
  })

  passport.use(
    'local',
    new LocalStrategy(async (username, password, done) => {
      const user = await db.getUser(username)

      // First check if any username matches were found
      if (user === null || typeof user == 'undefined') {
        return done(null, false)
      }

      if (user.role === 'participant' && password === 'none') {
        return done(null, user) // participants don't have passwords
      }

      const isMatch = await comparePass(password, user.password)
      if (!isMatch) {
        return done(null, false)
      }

      return done(null, user)
    })
  )
}

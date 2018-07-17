const bcrypt = require('bcrypt-nodejs')

module.exports = {
  // Given a plaintext password, use bcrypt to return a hashed version of it
  hashPass: function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (_, salt) => {
        bcrypt.hash(password, salt, null, (_, hash) => {
          resolve(hash)
        })
      })
    })
  },

  // Given a plaintext password and a salted/hashed password, check for validity
  comparePass: function(plainPass, hashPass) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPass, hashPass, (compareErr, isMatch) => {
        if (compareErr) {
          reject(`Error evaluating password: ${compareErr}`)
        } else {
          resolve(isMatch)
        }
      })
    })
  }
}

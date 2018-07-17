const passport = require('passport')

module.exports = app => {
  app.get('/api/v1/auth/current_user', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(req.user) // Only present if user is authenticated via passport
  })

  app.post(
    '/api/v1/auth/login',
    passport.authenticate('local', {
      failureFlash: `Invalid Username/Password combination. Please try again.`
    }),
    (req, res) => {
      if (req.get('Content-Type') !== 'application/json') {
        res.sendStatus(400)
      }
      res.sendStatus(200) // Only sent if passport successfully authenticates
    }
  )

  app.get('/api/v1/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.post('/api/v1/auth/register', (req, res) => {
    // TODO
  })
}

//   app.post('api/auth/login', function(request, response) {
//     if (!request.body.hasOwnProperty('user')) {
//       response.status(400).send('Request did not contain any information.')
//     } else {

// }
//     // console.log("request body: ", request.body)

//     if (request.body.user.role === 'demo') {
//       // find the group, error out if it doesn't exist
//       findByGroup(request.body.user.group)
//         .then(function(group) {
//           var groupId = group.id
//           var username = request.body.user.username
//           return createDemoUser(username, groupId)
//         })
//         .then(function(user) {
//           response.status(200).json({
//             user: user
//           })
//         })
//       // create a new user as part of that group, using a randomly generated username
//       // set the user role to "demo"
//       // sign in the user
//     } else {
//       findByUsername(request.body.user.username).then(function(user) {
//         // console.log('Found ', user)
//         if (user !== null) {
//           if (user.role === 'facilitator') {
//             if (request.body.user.username === user.username) {
//               bcrypt.compare(
//                 request.body.user.password,
//                 user.password,
//                 function(err, res) {
//                   if (res === true) {
//                     response.status(200).json({
//                       user: user
//                     })
//                   } else {
//                     // If you get this far, user is not null, so password is wrong
//                     response.status(401).send('Invalid password.')
//                   }
//                 }
//               )
//             }
//           }
//           if (user.role === 'participant') {
//             if (request.body.user.username === user.username) {
//               response.status(200).json({
//                 user: user
//               })
//             } else {
//               response.status(401).send('Invalid username')
//             }
//           }
//         } else {
//           response.status(401).send('Did not find username.')
//         }
//       })
//     }
//   }
// })

// app.post('/signup', function(request, response) {
//   if (!request.body.hasOwnProperty('user')) {
//     response.status(400).send('Request did not contain any information.')
//   } else {
//     createFacilitator(
//       request.body.user.email,
//       request.body.user.username,
//       request.body.user.password
//     )
//       .then(function(user) {
//         if (user) {
//           response.status(201).json({
//             user: user
//           })
//         } else {
//           response.status(500).json({
//             message: 'User with this name already exists.',
//             error: 'User with this name already exists.'
//           })
//         }
//       })
//       .catch(function(err) {
//         console.error('>> Error in signup: ', err)
//         // console.log("Error creating account.", err.errors[0].message)
//         response.status(500).json({
//           message:
//             'Error creating account: ' +
//             err.errors[0].message[0].toUpperCase() +
//             err.errors[0].message.slice(1),
//           error: err
//         })
//       })
//   }
// })

// app.post('/signout', function(request, response) {
//   if (!request.body.hasOwnProperty('user')) {
//     response.status(400).send('Request did not contain any information.')
//   } else {
//     findUserById(request.body.user.id)
//       .then(function() {
//         // TODO: Log this in the events table
//         response.status(200).send('Successfully logged out.')
//       })
//       .catch(function(err) {
//         console.error('>> Error in signout: ', err)
//         response.status(500).send('Error logging out')
//       })
//   }
// })

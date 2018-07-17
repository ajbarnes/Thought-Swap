module.exports = db => {

  return {
    getUser: async u => {
      const user = await db.model('User').findOne({
        where: {
          username: u
        }
      })
      return user
    }
  }

}

// function findByUsername(u) {
//   // console.log('findByUsername', u)
//   return models.User.findOne({
//     where: {
//       username: u
//     },
//     include: [
//       {
//         model: models.Group,
//         as: 'facilitated'
//       }
//     ]
//   })
// }

// function findByGroup(groupName) {
//   return models.Group.findOne({
//     where: {
//       name: groupName
//     }
//   })
// }

// function findUserById(i) {
//   // console.log('findUserById', i)
//   return models.User.findOne({
//     where: {
//       id: i
//     }
//   })
// }

// // function updateUserSocketId(i, s) {
// // console.log('updateUserSocketId')
// // 	return models.User.update({
// // 		currentSocketId: s
// // 	},
// // 	{
// // 		where: {
// // 			id: i
// // 		}
// // 	})
// // }

// function findAllGroupsByOwner(i) {
//   // console.log('findAllGroupsByOwner', i)
//   return models.Group.findAll({
//     order: 'id DESC',
//     where: {
//       ownerId: i
//     },
//     include: [
//       {
//         model: models.User
//       }
//     ]
//   })
// }

// function findThoughts(info) {
//   // console.log('findThoughts', info)
//   return models.Thought.findAll({
//     where: {
//       promptId: info
//     },
//     include: [
//       {
//         model: models.User
//       }
//     ]
//   })
//   // return new Promise(function (resolve, reject) {
//   // 	resolve(info)
//   // })
// }

// function findAllActiveSockets(groupId) {
//   // console.log('findAllActiveSockets', groupId)
//   return models.Socket.findAll({
//     where: {
//       active: true
//     },
//     include: [
//       {
//         model: models.User,
//         where: {
//           groupId: groupId
//         }
//       }
//     ]
//   })
// }

// // function findPromptByAuthorAndSession (i, s) {
// // 	// console.log('findPromptByAuthorAndSession', i, s)
// // 	return models.Prompt.findOne({
// // 		where: {
// // 			userId: i,
// // 			sessionId: s
// // 		},
// // 		include: [
// // 			{ model: models.Thought }
// // 		]
// // 	})
// // }

// function findSessionThoughts(sessionId, userId) {
//   console.log('findSessionThoughts', sessionId)
//   return models.Thought.findAll({
//     where: {
//       userId: userId
//     },
//     include: [
//       {
//         model: models.Prompt,
//         where: {
//           sessionId: sessionId
//         }
//         // order: [['updatedAt', 'DESC']],
//       }
//     ]
//   })
// }

// function findCurrentPromptForGroup(sessionId) {
//   console.log('findCurrentPromptForGroup', sessionId)
//   return models.Prompt.findOne({
//     order: [['updatedAt', 'DESC']],
//     where: {
//       sessionId: sessionId
//     },
//     include: [
//       {
//         model: models.Thought,
//         where: {
//           deleted: 0
//         },
//         required: false
//       }
//     ]
//   })
// }

// function findGroupById(i) {
//   // console.log('findGroupById', i)
//   return models.Group.findOne({
//     where: {
//       id: i
//     },
//     include: [
//       {
//         model: models.User
//       },
//       {
//         model: models.Session
//       }
//     ]
//   })
// }

// function updateGroupSession(g, i) {
//   // console.log('updateGroupSession', g, i)
//   return models.Group.update(
//     {
//       CurrentSessionId: i
//     },
//     {
//       where: {
//         id: g
//       }
//     }
//   )
// }

// function createFacilitator(e, u, p) {
//   // console.log('createFacilitator', e, u, p)
//   return models.User.findOne({
//     where: {
//       username: u
//     }
//   }).then(function(user) {
//     if (user) {
//       return false // user already exists
//     }
//     return models.User.create({
//       email: e,
//       username: u,
//       password: bcrypt.hashSync(p),
//       role: 'facilitator'
//     })
//   })
// }

// function createGroup(n, i) {
//   // console.log('createGroup', n, i)
//   return models.Group.create({
//     name: n,
//     ownerId: i
//   })
// }

// function createSession(groupId) {
//   // console.log('createSession', groupId)
//   return models.Session.create({
//     start: new Date(),
//     groupId: groupId
//   })
// }

// function createPrompt(c, i, g, s) {
//   // console.log('createPrompt')
//   return models.Prompt.create({
//     content: c,
//     userId: i,
//     groupId: g,
//     sessionId: s
//   })
// }

// function createThought(c, i, p) {
//   // console.log('createThought', c, i, p)
//   return models.Thought.create({
//     content: c,
//     userId: i,
//     promptId: p
//   })
// }

// function deleteThought(thoughtId) {
//   // console.log('deleteThought', thoughtId)
//   return models.Thought.update(
//     {
//       deleted: true
//     },
//     {
//       where: {
//         id: thoughtId
//       }
//     }
//   )
// }

// function endSession(i) {
//   // console.log('endSession', i)
//   return models.Session.update(
//     {
//       end: new Date()
//     },
//     {
//       where: {
//         id: i
//       }
//     }
//   )
// }

// function createParticpant(g) {
//   // console.log('createParticpant', g)
//   var sillyname = makeName()
//   console.log('Creating participant with sillyname: ', sillyname)
//   return models.User.create({
//     email: null,
//     username: sillyname,
//     password: null,
//     role: 'participant',
//     groupId: g
//   })
// }

// function createDemoUser(userName, groupId) {
//   return models.User.create({
//     email: null,
//     username: userName,
//     password: null,
//     role: 'demo',
//     groupId: groupId
//   })
// }

// function createSocket(info) {
//   // console.log('createSocket', info)
//   return models.Socket.create({
//     socketioId: info.socketId,
//     userId: info.userId,
//     active: true
//   })
// }

// function setSocketInactive(socketId) {
//   // console.log('setSocketInactive', socketId)
//   return models.Socket.update(
//     {
//       active: false
//     },
//     {
//       where: {
//         socketioId: socketId
//       }
//     }
//   )
// }

// // return a promise that tells the caller when all of
// // the rooms have been left
// function leaveAllRooms(socket) {
//   // console.log('leaveAllRooms', socket)
//   return Promise.all(
//     Object.keys(socket.rooms).map(function(room) {
//       return socket.leaveAsync(room)
//     })
//   )
// }

// function findSocketByID(socketioId) {
//   // console.log('findSocketByID', socketioId)
//   return models.Socket.findOne({
//     where: {
//       socketioId: socketioId
//     },
//     include: [
//       {
//         model: models.User,
//         include: [
//           {
//             model: models.Group
//           }
//         ]
//       }
//     ]
//   })
// }

// function createEvent(info) {
//   if (!info.hasOwnProperty('socketid')) {
//     info.socketid = 'unknown'
//   }
//   if (!info.hasOwnProperty('type')) {
//     info.type = 'other'
//   }
//   console.log(
//     [
//       'Event Info >>',
//       '\nsocketID: ',
//       info.socketid,
//       '\ntype: ',
//       info.type,
//       '\ndata: ',
//       info.data,
//       '\n'
//     ].join(' ')
//   )

//   return models.Event.create({
//     type: info.type,
//     data: info.data,
//     socket: info.socketid
//   })
// }

// function createDistribution(data) {
//   return models.Distribution.create({
//     userId: data.recipient,
//     groupId: data.group,
//     thoughtId: data.thought
//   })
// }

// function getGroupColors() {
//   return models.GroupColor.findAll()
// }

// function setDistributionColors(options) {
//   // distId, colorId
//   return models.Distribution.findById(options.distId).then(function(
//     distribution
//   ) {
//     distribution.groupColorId = options.colorId
//     return distribution.save()
//   })
// }

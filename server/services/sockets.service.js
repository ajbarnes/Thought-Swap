module.exports = io => {
  console.log('Server socket events initialized..')
}

// module.exports = {
//   io.on('connection', function (socket) {
//     var address = socket.request.connection._peername;
//     // var address = socket.handshake.address;
//     console.log('New connection from ' + address.address);
//     Promise.promisifyAll(socket);
//     socket.emit('socket-id', socket.id);
//     createEvent({
//       type: 'connect',
//       data: 'Client Connected',
//       socketid: socket.id
//     });

//     socket.on('disconnect', function () {
//       createEvent({
//         type: 'disconnect',
//         data: 'Client Disconnected',
//         socketid: socket.id
//       });
//     });

//     // =====================================================
//     // Facilitator Specific Triggers

//     /**
//      * Ensures the facilitator user is only in the socket room
//      * they choose and syncs the current session so they can
//      * see thoughts entered before they arrived.
//      *
//      * @param: INT groupId - The db id of group said facilitator wants to join
//      */
//     socket.on('facilitator-join', function (data) {
//       leaveAllRooms(socket)
//         .then(function () {
//           return socket.joinAsync('discussion-' + data.groupId);
//         })
//         .then(function () {
//           return socket.joinAsync('facilitator-' + data.groupId);
//         })
//         .then(function () {
//           return getActiveSession(data.groupId, socket);
//         })
//         .then(function (session) {
//           console.log('active session in fac-join');
//           console.log(session);
//           return findCurrentPromptForGroup(session.get('id'))
//             .then(function (defaultPrompt) {
//               console.log(defaultPrompt);
//               getGroupColors()
//                 .then(function (colors) {
//                   socket.emit('group-colors', colors);
//                 });

//               var room = 'discussion-' + data.groupId;
//               var message = 'sessionsyncres';
//               var messageData = {
//                 sessionId: session.get('id'),
//                 prompt: defaultPrompt
//               };

//               console.log('about to io.emit', room, message, messageData);

//               // why shouldn't this only talk to the socket that has just joined?
//               io.to(room).emit(message, messageData);
//             });

//           // maybe need to bring this back eventually, but right now the
//           // distribution code uses the sockets to count who to give thoughts to
//           // createSocket({
//           // 	socketId: socket.id,
//           // 	userId: data.userId
//           // })
//         });
//     });

//     socket.on('facilitator-leave', function (socketId) {
//       // console.log('marking inactive', socketId)
//       setSocketInactive(socketId);
//     });

//     /**
//      * Takes facilitator prompt and ensures it appears on all participant views.
//      *
//      * @param: STRING content - user given prompt to be broadcast to participants
//      */
//     socket.on('new-prompt', function (data) {
//       models.Session.findById(data.sessionId)
//         .then(function (session) {
//           session.viewingDistribution = false;
//           return session.save();
//         });
//       createPrompt(data.prompt, data.userId, data.groupId, data.sessionId)
//         .then(function (prompt) {
//           io.to('discussion-' + data.groupId).emit('facilitator-prompt', prompt);
//         });
//     });

//     // Should: load new session if one does not exist
//     // send thoughts to facilitator, prompt to participants,

//     // this event ONLY comes in when the facilitator requests a new session.
//     // so it should always create a new session.
//     socket.on('session-sync-req', function (data) {
//       findGroupById(data.groupId)
//         .then(function (group) {
//           if (group.get('CurrentSessionId') !== null) {
//             // console.log("Recieved request for new session")
//             endSession(group.get('CurrentSessionId'));
//           }
//           initSession({
//             groupId: data.groupId
//           })
//             .then(function (newPrompt) {
//               io.to('discussion-' + data.groupId).emit('new-session-prompt', newPrompt);
//             });
//         })
//         .catch(function (error) {
//           console.error('>> Error syncing session:', error);
//         });
//     });

//     /**
//      * **CORE FUNCTIONALITY**
//      * Performs the heavy lifting of shuffling thoughts and handing
//      * them back to all participant users in the given group
//      *
//      * @param: INT groupId - The db id of the group whose session needs distribution
//      */
//     socket.on('distribute', function (data) {
//       // TODO:
//       return Promise.all([
//         models.Session.findById(data.sessionId)
//           .then(function (session) {
//             session.viewingDistribution = true;
//             return session.save();
//           }),
//         findAllActiveSockets(data.groupId),
//         findThoughts(data.promptId)
//       ])
//         .then(function (results) {
//           // console.log('promise.all in distribute')
//           // console.log(results.length)
//           // console.log(results)
//           // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//           // Returns a random integer between min (included) and max (excluded)
//           // Using Math.round() will give you a non-uniform distribution!
//           function getRandomInt(min, max) {
//             return Math.floor(Math.random() * (max - min)) + min;
//           }

//           var activeSockets = shuffle(results[1]); // active users
//           var thoughts = shuffle(results[2]);

//           // console.log('activeSockets')
//           // console.log(activeSockets)

//           // console.log('thoughts')
//           // console.log(thoughts)

//           var thoughtsLength = thoughts.length;

//           // find how many active users didn't submit thoughts, and then pad the
//           // thoughts array with those many copied thoughts
//           var numCopies = activeSockets.length - thoughts.length;
//           if (numCopies > 0) {
//             for (var i = 0; i < numCopies; i++) {
//               thoughts.push(thoughts[getRandomInt(0, thoughtsLength)]);
//             }
//           }
//           // console.log(results)

//           // need to make 2 dicts:
//           // 1. thought by author id
//           // 2. socketid by user id

//           // populating "thoughtsAuthors" array with every item in "thoughts"
//           var thoughtsAuthors = [];
//           thoughts.forEach(function (thought) {
//             // console.log(thought)
//             thoughtsAuthors.push(thought);
//           });

//           var presenters = [];
//           var socketsByUId = {};

//           activeSockets.forEach(function (connectedSocket) {
//             // console.log(connectedSocket)
//             presenters.push(connectedSocket.get('userId'));
//             socketsByUId[connectedSocket.get('userId')] = connectedSocket;
//           });

//           // console.log(presenters, thoughtsAuthors)
//           // via http://stackoverflow.com/a/6274381/3850442
//           function shuffle(o) {
//             for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
//               return o;
//           }

//           // TODO: is there a FIXME here?
//           // FIXME: should we do the possibleMatches in a random manner?
//           // right now i think the distribution is fairly regular and people
//           // will probably always get the same other person's thought
//           function possibleMatches(thoughts, thoughtPresenters) {
//             // console.log('possibleMatches')
//             // console.log(thoughtAuthors.length)
//             // console.log(thoughtPresenters.length)
//             var edges = [];
//             for (var i = 0; i < thoughts.length; i++) {
//               for (var j = 0; j < thoughtPresenters.length; j++) {
//                 // console.log(thoughtAuthors[i], thoughtPresenters[j])

//                 // checking the thought is not from the author of that thought
//                 if (thoughts[i].get('userId') !== thoughtPresenters[j]) {
//                   edges.push([i, j]);
//                   // console.log([i,j])
//                 }
//               }
//             }
//             // console.log('possible matches', edges)
//             // shuffle(edges)
//             return edges;
//           }
//           // console.log(possibleMatches(3,4))

//           // let m represent the number of connected potential readers,
//           // and let n rep the number of submitted thoughts

//           // function thoughtMatcher(m, n) {
//           // }

//           var potentialMatches = possibleMatches(thoughtsAuthors, presenters);
//           // console.log('potential matches', potentialMatches)

//           var distribution = findMatching(thoughtsAuthors.length, presenters.length, potentialMatches);
//           // console.log('distribution', distribution)

//           function formatDistribution(distribution) {
//             return distribution.map(function (pairing) {
//               var authorOfThought = thoughtsAuthors[pairing[0]].get('userId');
//               var recipientOfThought = presenters[pairing[1]];
//               return recipientOfThought + ' got thought from ' + authorOfThought;
//             }).join('\n');
//           }

//           createEvent({
//             socketid: socket.id,
//             data: 'groupId: ' + data.groupId + ', ' + 'promptId: ' + data.promptId + '\n' +
//               'matches: ' + formatDistribution(distribution),
//             type: 'distribution'
//           });

//           distribution.forEach(function (pairing) {
//             // console.log('currrent pairing', pairing)
//             var thoughtToSendIndex = pairing[0];
//             var presenterToReceive = pairing[1];
//             var presenterSocketIdx = presenters[presenterToReceive];
//             var socketIdOfReceipient = socketsByUId[presenterSocketIdx].get('socketioId');
//             var thoughtAuthorForSending = thoughtsAuthors[thoughtToSendIndex];
//             var thoughtContent = thoughtAuthorForSending.get('content');

//             // console.log('current group', thoughtAuthorForSending.get('user').get('groupId'))

//             createDistribution({
//               recipient: presenterSocketIdx,
//               thought: thoughtAuthorForSending.get('id'),
//               group: thoughtAuthorForSending.get('user').get('groupId')
//             })
//               .then(function (newDistribution) {
//                 // console.log('created distribution')
//                 // console.log(newDistribution.get('id'))

//                 // it's possible someone has disconnected. don't friggin die if they did!
//                 if (typeof io.sockets.connected[socketIdOfReceipient] !== 'undefined') {
//                   io.sockets.connected[socketIdOfReceipient].emit('distributed-thought', {
//                     id: thoughtAuthorForSending.get('id'),
//                     content: thoughtContent,
//                     distId: newDistribution.get('id')
//                   });
//                 }
//               });
//           });
//         });
//     });

//     // =====================================================
//     // Participant Specific Triggers

//     /**
//      * Ensures the participant user is only in the socket room
//      * they belong to and syncs the current session with users
//      * who join after the session begins.
//      *
//      * @param: INT groupId - The db id of the group said participant belongs to
//      */
//     socket.on('participant-join', function (data) {
//       console.log('participant-join', data);

//       getGroupColors()
//         .then(function (colors) {
//           socket.emit('group-colors', colors);
//         });

//       leaveAllRooms(socket)
//         .then(function () {
//           return socket.joinAsync('discussion-' + data.groupId);
//         })
//         .then(function () {
//           return socket.joinAsync('participant-' + data.groupId);
//         })
//         .then(function () {
//           getActiveSession(data.groupId, socket)
//             .then(function (session) {
//               // console.log("Active Session:", session)
//               // End last session?

//               // get current prompt
//               findCurrentPromptForGroup(session.get('id'))
//                 .then(function (defaultPrompt) {
//                   console.log('found current prompt', defaultPrompt.id, defaultPrompt.content);
//                   var room = 'discussion-' + data.groupId;
//                   var message = 'sessionsyncres';
//                   var messageData = {
//                     sessionId: session.get('id'),
//                     prompt: defaultPrompt
//                   };

//                   // i'm late (or refreshed?) and my class is already viewing
//                   // distributed thoughts,
//                   if (session.viewingDistribution) {
//                     // look for a distribution for me,
//                     models.Distribution.findOne({
//                       where: {
//                         userId: data.userId
//                       },
//                       include: {
//                         model: models.Thought,
//                         where: {
//                           promptId: defaultPrompt.id
//                         }
//                       }
//                     })
//                       .then(function (dist) {
//                         if (dist) {
//                           socket.emit('distributed-thought', {
//                             id: dist.thoughtId,
//                             content: dist.thought.content,
//                             distId: dist.id,
//                             agrees: dist.agrees
//                           });
//                         } else {
//                           // if it's not found, create one!
//                           models.sequelize.query('select thoughts.* from ' +
//                             'thoughts where thoughts.promptId=:promptId and ' +
//                             'thoughts.userId<>:userId and thoughts.id not in ' +
//                             '(select distributions.thoughtId from distributions ' +
//                             'join thoughts on distributions.thoughtId=thoughts.id ' +
//                             'where thoughts.promptId=:promptId)', {
//                               replacements: {
//                                 promptId: defaultPrompt.id,
//                                 userId: data.userId
//                               },
//                               type: models.sequelize.QueryTypes.SELECT
//                             }).then(function (unusedThoughtIds) {
//                               if (unusedThoughtIds && unusedThoughtIds.length > 0) {
//                                 console.log('unusedThoughtIds if');
//                                 console.log(unusedThoughtIds);
//                                 return createDistribution({
//                                   recipient: data.userId,
//                                   thought: unusedThoughtIds[0].id,
//                                   group: data.groupId
//                                 })
//                                   .then(function (newDistribution) {
//                                     console.log('created distribution');
//                                     console.log(newDistribution.get('id'));
//                                     socket.emit('distributed-thought', {
//                                       id: unusedThoughtIds[0].id,
//                                       content: unusedThoughtIds[0].content,
//                                       distId: newDistribution.get('id')
//                                     });
//                                   });
//                               } else {
//                                 console.log('unusedThoughtIds else');
//                                 // all thoughts are distributed, just pick one that's not mine
//                                 return models.Thought.findOne({
//                                   where: {
//                                     promptId: defaultPrompt.id,
//                                     userId: {
//                                       $ne: data.userId
//                                     }
//                                   }
//                                 }).then(function (thoughtToDist) {
//                                   return createDistribution({
//                                     recipient: data.userId,
//                                     thought: thoughtToDist.id,
//                                     group: data.groupId
//                                   })
//                                     .then(function (newDistribution) {
//                                       console.log('created distribution');
//                                       console.log(newDistribution.get('id'));
//                                       socket.emit('distributed-thought', {
//                                         id: thoughtToDist.id,
//                                         content: thoughtToDist.content,
//                                         distId: newDistribution.get('id')
//                                       });
//                                     });
//                                 });
//                               }
//                             });
//                         }
//                       });
//                   }

//                   // setTimeout(function () {
//                   // socket.broadcast.to(room).emit(message, messageData)
//                   io.to(room).emit(message, messageData);
//                   io.to('facilitator-' + data.groupId).emit('participant-join');
//                   // }, 2000)
//                 });

//               // findSessionThoughts(session.get('id'), data.userId)
//               // 	.then(function(prevThoughts) {
//               // 		// maybe don't do this bc it could harm anonymity?
//               // 		// socket.emit('previous-thoughts', prevThoughts)
//               // 	})

//               return createSocket({
//                 socketId: socket.id,
//                 userId: data.userId
//               });
//             })
//             .catch(function (error) {
//               console.error('Error in participant join', error);
//             });
//         });
//     });

//     socket.on('participant-leave', function (data) {
//       // TODO: market Socket Obj inactive
//       findSocketByID(data)
//         .then(function (socket) {
//           if (socket && socket.get('user') && socket.get('user').get('group') &&
//             socket.get('user').get('group').get('id')) {

//             io.to('facilitator-' + socket.get('user').get('group')
//               .get('id')).emit('participant-leave');
//           }
//         });
//       setSocketInactive(data);
//     });

//     /**
//      * Takes participant thought and ensures it appears on the facilitator's view.
//      *
//      * @param: STRING content - user-given thought to be broadcast to facilitator
//      */
//     socket.on('new-thought', function (newThought) {
//       // console.log(newThought)
//       createThought(newThought.content, newThought.author.id, newThought.promptId)
//         .then(function (thought) {
//           socket.broadcast.to('facilitator-' + newThought.author.groupId)
//             .emit('participant-thought', thought);
//         })
//         .catch(function (error) {
//           console.error('>> Error on new thought:', error);
//         });
//     });

//     socket.on('choose-group', function (chosenInfo) {
//       // chosenInfo has keys: thoughtId, thoughtGroupId, groupId
//       // get the groupID for this class
//       // then
//       console.log('choose-group', chosenInfo);
//       if (chosenInfo.hasOwnProperty('thoughtId') &&
//         chosenInfo.hasOwnProperty('distId') &&
//         chosenInfo.hasOwnProperty('thoughtGroupId') &&
//         chosenInfo.hasOwnProperty('groupId') &&
//         chosenInfo.hasOwnProperty('presenter')) {
//         setDistributionColors({ // distId, colorId
//           distId: chosenInfo.distId,
//           colorId: chosenInfo.thoughtGroupId
//         });
//         socket.broadcast.to('facilitator-' + chosenInfo.groupId)
//           .emit('group-chosen', chosenInfo);
//       }
//     });

//     socket.on('fac-delete-thought', function (data) {
//       deleteThought(data.thoughtId);
//     });

//     socket.on('log', function (info) {
//       info.socketid = socket.id;
//       createEvent(info);
//     });

//     socket.on('add-person', function (group) {
//       console.log('add-person', group.id);
//       getUniqueSillyname()
//         .then(function (uniqueSillyName) {
//           return models.Group.findById(group.id)
//             .then(function (dbGroup) {
//               dbGroup.addPersonWithName(uniqueSillyName)
//                 .then(function (newUser) {
//                   socket.emit('added-new-person', newUser);
//                 });
//             });
//         });
//     });

//     function setAgreement(id, agrees) {
//       return models.Distribution.findById(id)
//         .then(function (dist) {
//           dist.setAgreement(agrees);
//         });
//     }

//     socket.on('agree', function (distributedThought) {
//       console.log(distributedThought);
//       setAgreement(distributedThought.distId, true);
//     });

//     socket.on('disagree', function (distributedThought) {
//       console.log(distributedThought);
//       setAgreement(distributedThought.distId, false);
//     });
//   });

// }

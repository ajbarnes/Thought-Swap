const { hashPass } = require('../services/crypto.service')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const facilitatorPass = await hashPass('password01')
    const facilitatorPassTwo = await hashPass('password02')
    return await queryInterface.bulkInsert('Users', [
      {
        role: 'facilitator',
        username: 'facilitator01',
        password: facilitatorPass,
        email: 'facilitator01@test.com'
      },
      {
        role: 'facilitator',
        username: 'facilitator02',
        password: facilitatorPassTwo,
        email: 'facilitator02@test.com'
      },
      {
        role: 'participant',
        username: 'Almond SepiaMelon',
        password: 'none',
        email: null
      },
      {
        role: 'participant',
        username: 'Ruby MonochromeShrimp',
        password: 'none',
        email: null
      },
      {
        role: 'participant',
        username: 'Cerise AsparagusDenim',
        password: 'none',
        email: null
      }
    ]).catch(err => console.error(err))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}

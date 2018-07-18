describe('Sillyname Service:', () => {
  // TAG: Unit
  const service = require('../services/sillyname.service')

  test('it returns the expected sillyname', () => {
    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.55
    global.Math = mockMath

    const sillyname = service.generateSillyname()
    expect(sillyname).toBe('Maize GoldFinger')
  })
})

describe('Crypto Service:', () => {
  // TAG: Unit
  const service = require('../services/crypto.service')

  test('hashPass returns a hash of a given password', async () => {
    const hashedPassword = await service.hashPass('password')
    expect(hashedPassword).not.toBe('password')
    expect(hashedPassword).toContain('$')
  })

  test('comparePass returns true for matching passwords', async () => {
    const hashedPassword = await service.hashPass('password')

    const isMatch = await service.comparePass('password', hashedPassword)
    expect(isMatch).toBe(true)
  })

  test('comparePass returns false for mismatched passwords', async () => {
    const hashedPassword = await service.hashPass('password')

    const isMatch = await service.comparePass('javascript', hashedPassword)
    expect(isMatch).toBe(false)
  })

  test('comparePass returns an error when making invalid comparisons', async () => {
    const hashedPassword = await service.hashPass('password')

    await expect(service.comparePass(null, hashedPassword)).rejects.toContain(
      'Error evaluating password:'
    )
  })
})

describe('Authentication Service:', () => {
  // TAG: Integration
  const request = require('supertest')

  const goodParticipantCreds = {
    username: 'Almond SepiaMelon',
    password: 'none'
  }
  const goodFacilitatorCreds = {
    username: 'facilitator02',
    password: 'password02'
  }
  const badParticipantCreds = { username: 'Some RandomName', password: 'none' }
  const badFacilitatorCreds = { username: 'facilitator01', password: 'hunter2' }

  test('login attempt with with bad data returns Bad Request', () => {
    const serverRoot = require('../index.js')
    request(serverRoot.app)
      .post('/api/auth/login')
      .send('blah')
      .expect(400)
      .then(() => {
        serverRoot.sockets.close()
        serverRoot.app.close()
      })
  })

  test('facilitator can fully traverse a session', () => {
    const serverRoot = require('../index.js')
    let cookie = ''

    return request(serverRoot.app)
      .post('/api/auth/login')
      .send(goodFacilitatorCreds)
      .expect(200)
      .then(res => {  // facilitator can successfully log in
        // Current bug. Jest treats multiple cookies as one string. Split em
        // https://github.com/facebook/jest/issues/2549
        cookie = res.header['set-cookie'][0]
          .split(',')
          .map(item => item.split(';')[0])
          .join(';')
      })
      .then(() => { // authenticated request to current_user returns user's data
        return request(serverRoot.app)
          .get('/api/auth/current_user')
          .set('cookie', cookie)
          .then(res => {
            expect(res.body.id).toBe(2)
            expect(res.body.email).toBe('facilitator02@test.com')
          })
      })
      .then(() => { // logout redirects
        return request(serverRoot.app)
          .get('/api/auth/logout')
          .expect(302)
          .then(res => {
            expect(res.header['location']).toBe('/')
          })
      })
      .then(() => { // subsequent request to current_user is empty
        return request(serverRoot.app)
          .get('/api/auth/current_user')
          .then(res => {
            expect(res.body).toBe('')
          })
      })
      .then(() => {
        serverRoot.sockets.close()
        serverRoot.app.close()
      })
  })

  test('login attempt with correct participant credentials succeeds', () => {
    const serverRoot = require('../index.js')
    return request(serverRoot.app)
      .post('/api/auth/login')
      .send(goodParticipantCreds)
      .expect(200)
      .then(() => {
        serverRoot.sockets.close()
        serverRoot.app.close()
      })
  })

  test('login attempt with incorrect facilitator credentials fails', () => {
    const serverRoot = require('../index.js')
    return request(serverRoot.app)
      .post('/api/auth/login')
      .send(badFacilitatorCreds)
      .expect(401)
      .then(() => {
        serverRoot.sockets.close()
        serverRoot.app.close()
      })
  })

  test('login attempt with incorrect participant credentials fails', () => {
    const serverRoot = require('../index.js')
    return request(serverRoot.app)
      .post('/api/auth/login')
      .send(badParticipantCreds)
      .expect(401)
      .then(() => {
        serverRoot.sockets.close()
        serverRoot.app.close()
      })
  })
})

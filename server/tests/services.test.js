const request = require('supertest')

describe('Sillyname Service:', () => {
  const service = require('../services/sillyname.service')

  test('it returns the expected sillyname', () => {
    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.55
    global.Math = mockMath

    const sillyname = service.generateSillyname()
    expect(sillyname).toBe('Maize GoldFinger')
  })
})

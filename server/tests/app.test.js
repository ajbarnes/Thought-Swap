const request = require('supertest')

describe('Basic Server Functionality:', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  test('it should start regularly without crashing', () => {
    process.env.NODE_ENV = 'development'
    const express = require('../index.js')
    express.connection.close()
  })

  test('it should serve a react built index.html with code 200', async () => {
    process.env.NODE_ENV = 'production'
    const express = await require('../index.js')
    return request(express.connection)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toContain('<title>ThoughtSwap</title>')
      })
      .then(() => {
        express.connection.close()
      })
  })
})

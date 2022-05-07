const request = require('supertest')
const app = require('../../src/app')

jest.mock('../../src/repositories/venues')

describe('health check end points', () => {
  test('readiness - GET /healthy returns 200', async () => {
    const res = await request(app).get('/healthy')

    expect(res.status).toEqual(200)
    expect(res.text).toEqual('ok')
    expect(res.headers['content-type']).toEqual('text/html; charset=utf-8')
  })

  test('liveness - GET /healthz returns 200', async () => {
    const res = await request(app).get('/healthz')

    expect(res.status).toEqual(200)
    expect(res.text).toEqual('ok')
    expect(res.headers['content-type']).toEqual('text/html; charset=utf-8')
  })
})

const request = require('supertest')
const app = require('../../src/app')

jest.mock('../../src/repositories/venue')
const venuRepo = require('../../src/repositories/venue')

describe('venues API', () => {
  test('GET /venues returns all venues', async () => {
    const data = [{ a: 'here' }]
    venuRepo.getAll.mockResolvedValue(data)

    const res = await request(app).get('/venues')

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(data)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
  })
})

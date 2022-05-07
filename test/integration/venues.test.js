const request = require('supertest')
const app = require('../../src/app')

jest.mock('../../src/repositories/venue')
const venueRepo = require('../../src/repositories/venue')

describe('venues API', () => {
  test('GET /venues returns all venues', async () => {
    const data = [{ a: 'here' }]
    venueRepo.getAll.mockResolvedValue(data)

    const res = await request(app).get('/venues')

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(res.body).toEqual(data)
  })

  test('GET /venues/location/lat/lng returns venues ordered by distance from point', async () => {
    const lat = 55
    const lng = -1.5
    const data = [{ id: 1, lat: 54, lng: -1.5 }, { id: 2, lat: 55, lng: -1.5 }]
    venueRepo.getAll.mockResolvedValue(data)

    const res = await request(app).get(`/venues/location/${lat}/${lng}`)

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(res.body.length).toEqual(data.length)
    expect(res.body[0].id).toEqual(2)
    expect(res.body[1].id).toEqual(1)
    expect(res.body[0]).not.toHaveProperty('distance')
    expect(res.body[1]).not.toHaveProperty('distance')
  })

  test('GET /venues/location/lat/lng?dist=true returns venues ordered by distance from point with distance', async () => {
    const lat = 55
    const lng = -1.5
    const data = [{ id: 1, lat: 54, lng: -1.5 }, { id: 2, lat: 55, lng: -1.5 }]
    venueRepo.getAll.mockResolvedValue(data)

    const res = await request(app).get(`/venues/location/${lat}/${lng}?dist=true`)

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(res.body.length).toEqual(data.length)
    expect(res.body[0].id).toEqual(2)
    expect(res.body[0].distance).toEqual(0)
    expect(res.body[1].id).toEqual(1)
    expect(res.body[1].distance).toEqual(111319)
  })
})

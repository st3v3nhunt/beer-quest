const request = require('supertest')
const app = require('../../src/app')

jest.mock('../../src/repositories/venues')
const venuesRepo = require('../../src/repositories/venues')

describe('venues API', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('GET /venues returns venues', async () => {
    const venues = [{}]
    venuesRepo.getAll.mockResolvedValue(venues)

    const res = await request(app).get('/venues')

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(res.body).toEqual(venues)
    expect(venuesRepo.getAll).toHaveBeenCalledTimes(1)
    expect(venuesRepo.getAll).toHaveBeenCalledWith(50)
  })

  test('GET /venues?size=n returns n venues', async () => {
    const venueCount = 10
    const venues = [{}]
    venuesRepo.getAll.mockResolvedValue(venues)

    const res = await request(app).get(`/venues?size=${venueCount}`)

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(res.body).toEqual(venues)
    expect(venuesRepo.getAll).toHaveBeenCalledTimes(1)
    expect(venuesRepo.getAll).toHaveBeenCalledWith(venueCount)
  })

  test.each([
    { dist: 'true', includeDistance: true },
    { dist: 't', includeDistance: false },
    { dist: undefined, includeDistance: false },
    { dist: 'false', includeDistance: false },
    { dist: '', includeDistance: false }
  ])('GET /venues/location/lat/lng?[dist=$dist] returns venues ordered by distance', async ({ dist, includeDistance }) => {
    const lat = '55'
    const lng = '-1.5'
    const venues = [{}]
    venuesRepo.getByLocation.mockResolvedValue(venues)

    const res = await request(app).get(`/venues/location/${lat}/${lng}?dist=${dist}`)

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(res.body).toEqual(venues)
    expect(venuesRepo.getByLocation).toHaveBeenCalledTimes(1)
    expect(venuesRepo.getByLocation).toHaveBeenCalledWith({ lat, lng }, includeDistance)
  })
})

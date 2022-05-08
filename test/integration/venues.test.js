const request = require('supertest')
const app = require('../../src/app')

jest.mock('../../src/repositories/venues')
const venuesRepo = require('../../src/repositories/venues')

describe('venues API', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('GET /venues', () => {
    test('returns venues', async () => {
      const venues = [{}]
      venuesRepo.getAll.mockResolvedValue(venues)

      const res = await request(app).get('/venues')

      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
      expect(res.body).toEqual(venues)
      expect(venuesRepo.getAll).toHaveBeenCalledTimes(1)
      expect(venuesRepo.getAll).toHaveBeenCalledWith(50)
    })

    test('with size param set to N returns N venues', async () => {
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
  })

  describe('GET venues by location', () => {
    const lat = '55'
    const lng = '-1.5'
    const defaultRatings = { amenities: 0, atmosphere: 0, beer: 0, value: 0 }

    test.each([
      { dist: 'true', includeDistance: true },
      { dist: 't', includeDistance: false },
      { dist: undefined, includeDistance: false },
      { dist: 'false', includeDistance: false },
      { dist: '', includeDistance: false }
    ])('returns venues ordered by distance', async ({ dist, includeDistance }) => {
      const venues = [{}]
      venuesRepo.getByLocation.mockResolvedValue(venues)

      const res = await request(app).get(`/venues/location/${lat}/${lng}?dist=${dist}`)

      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
      expect(res.body).toEqual(venues)
      expect(venuesRepo.getByLocation).toHaveBeenCalledTimes(1)
      expect(venuesRepo.getByLocation).toHaveBeenCalledWith({ lat, lng }, includeDistance, defaultRatings)
    })

    test('and ratings calls repo with correct arguments - single argument', async () => {
      const beer = 5
      const expectedRatings = { ...defaultRatings, beer }

      const res = await request(app).get(`/venues/location/${lat}/${lng}?beer=${beer}`)

      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
      expect(venuesRepo.getByLocation).toHaveBeenCalledTimes(1)
      expect(venuesRepo.getByLocation).toHaveBeenCalledWith({ lat, lng }, false, expectedRatings)
    })

    test('and ratings calls repo with correct arguments - all possible ratings', async () => {
      const amenities = 1
      const atmosphere = 2
      const beer = 3
      const value = 4
      const expectedRatings = { amenities, atmosphere, beer, value }

      const res = await request(app).get(`/venues/location/${lat}/${lng}?amenities=${amenities}&atmosphere=${atmosphere}&beer=${beer}&value=${value}`)

      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
      expect(venuesRepo.getByLocation).toHaveBeenCalledTimes(1)
      expect(venuesRepo.getByLocation).toHaveBeenCalledWith({ lat, lng }, false, expectedRatings)
    })

    test('and ratings calls repo with correct arguments - incorrect input uses default ratings', async () => {
      const res = await request(app).get(`/venues/location/${lat}/${lng}?beer=not-a-number&value=value`)

      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
      expect(venuesRepo.getByLocation).toHaveBeenCalledTimes(1)
      expect(venuesRepo.getByLocation).toHaveBeenCalledWith({ lat, lng }, false, defaultRatings)
    })
  })
})

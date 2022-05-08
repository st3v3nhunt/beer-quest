function createVenues (amount) {
  const venues = []
  for (let i = 0; i < amount; i++) {
    venues.push({
      id: i,
      lat: `55.${i}`,
      lng: `-1.5${i}`,
      stars_amenities: '0',
      stars_atmosphere: '0',
      stars_beer: '0',
      stars_value: '0'
    })
  }
  return venues
}

describe('venues repository', () => {
  let venuesRepo
  let loadData
  const venues100 = createVenues(100)

  beforeEach(async () => {
    jest.resetModules()
    venuesRepo = require('../../../src/repositories/venues')
    loadData = require('../../../src/lib/load-data')
    jest.mock('../../../src/lib/load-data')
  })

  async function initRepo (data) {
    loadData.mockResolvedValueOnce(data)
    await venuesRepo.init()
  }

  describe('init', () => {
    test('loads data once when data is returned', async () => {
      await initRepo(venues100)
      await venuesRepo.init()
      await venuesRepo.init()

      expect(loadData).toHaveBeenCalledTimes(1)
    })

    test('loads data until it has loaded data', async () => {
      await venuesRepo.init()
      await venuesRepo.init()
      await initRepo(venues100)
      await venuesRepo.init()
      await venuesRepo.init()

      expect(loadData).toHaveBeenCalledTimes(3)
    })
  })

  describe('getAll', () => {
    test('returns 50 by default', async () => {
      await initRepo(venues100)

      const res = await venuesRepo.getAll()

      expect(res.length).toEqual(50)
    })

    test('returns pageSize when less than 50', async () => {
      await initRepo(venues100)
      const pageSize = 49

      const res = await venuesRepo.getAll(pageSize)

      expect(res.length).toEqual(pageSize)
    })

    test('returns 50 when pageSize is greater than 50', async () => {
      await initRepo(venues100)
      const pageSize = 51

      const res = await venuesRepo.getAll(pageSize)

      expect(res.length).toEqual(50)
    })
  })

  describe('getByLocation', () => {
    test.each([
      { includeDistance: false },
      { includeDistance: true }
    ])('returns all venues ordered by distance from coords and does not mutate venues', async ({ includeDistance }) => {
      await initRepo(venues100)
      const lat = '55'
      const lng = '-1.5'
      const coords = { lat, lng }

      const res = await venuesRepo.getByLocation(coords, includeDistance)

      expect(res.length).toEqual(venues100.length)
      expect(res[0].id).toEqual(0)
      expect(res[99].id).toEqual(99)

      let currDist = 0
      let prevDist = 0
      res.forEach(x => {
        if (includeDistance) {
          expect(x).toHaveProperty('distance')
          expect(currDist).toBeGreaterThanOrEqual(prevDist)
          prevDist = currDist
          currDist = x.distance
        } else {
          expect(x).not.toHaveProperty('distance')
        }
      })
      const venuesWithDistance = (await venuesRepo.getAll()).filter(x => x.distance !== undefined)
      expect(venuesWithDistance.length).toEqual(0)
    })

    test.each([
      { rating: 'amenities', score: '5' },
      { rating: 'atmosphere', score: '5' },
      { rating: 'beer', score: '5' },
      { rating: 'value', score: '5' }
    ])('results are filtered according to the ratings requested', async ({ rating, score }) => {
      const venues = createVenues(5)
      venues[0][`stars_${rating}`] = score
      await initRepo(venues)
      const lat = '55'
      const lng = '-1.5'
      const coords = { lat, lng }
      const ratings = { }
      ratings[rating] = score

      const res = await venuesRepo.getByLocation(coords, false, ratings)

      expect(res.length).toEqual(1)
      expect(res[0][`stars_${rating}`]).toEqual(score)
    })
  })
})

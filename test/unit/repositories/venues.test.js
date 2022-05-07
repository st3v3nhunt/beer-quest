const { getAll, init, getByLocation } = require('../../../src/repositories/venues')

function createVenues (amount) {
  const venues = []
  for (let i = 0; i < amount; i++) {
    venues.push({ id: i, lat: `55.${i}`, lng: `-1.5${i}` })
  }
  return venues
}
const loadData = require('../../../src/lib/load-data')
jest.mock('../../../src/lib/load-data')

describe('venues repository', () => {
  const venues = createVenues(100)

  beforeAll(async () => {
    jest.resetAllMocks()
    loadData.mockResolvedValueOnce(venues)
    await init()
  })

  test('init calls loads data once', async () => {
    await init()
    await init()

    expect(loadData).toHaveBeenCalledTimes(1)
  })

  test('getAll returns 50 by default', async () => {
    const res = await getAll()

    expect(res.length).toEqual(50)
  })

  test('getAll returns pageSize when less than 50', async () => {
    const pageSize = 49

    const res = await getAll(pageSize)

    expect(res.length).toEqual(pageSize)
  })

  test('getAll returns 50 when pageSize is greater than 50', async () => {
    const pageSize = 51

    const res = await getAll(pageSize)

    expect(res.length).toEqual(50)
  })

  test.each([
    { includeDistance: false },
    { includeDistance: true }
  ])('getByLocation returns all venues ordered by distance from coords and does not mutate venues', async ({ includeDistance }) => {
    const lat = '55'
    const lng = '-1.5'
    const coords = { lat, lng }

    const res = await getByLocation(coords, includeDistance)

    expect(res.length).toEqual(venues.length)
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
    const venuesWithDistance = (await getAll()).filter(x => x.distance !== undefined)
    expect(venuesWithDistance.length).toEqual(0)
  })
})

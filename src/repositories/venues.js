const geolib = require('geolib')
const loadData = require('../lib/load-data')

function filterByRatings (venues, ratings) {
  const defaultRatings = { amenities: 0, atmosphere: 0, beer: 0, value: 0 }
  const mergedRatings = { ...defaultRatings, ...ratings }
  return venues
    .filter(x => x.stars_amenities >= mergedRatings.amenities)
    .filter(x => x.stars_atmosphere >= mergedRatings.atmosphere)
    .filter(x => x.stars_beer >= mergedRatings.beer)
    .filter(x => x.stars_value >= mergedRatings.value)
}

let venues
async function init () {
  if (!venues) {
    venues = await loadData()
  }
}

async function getAll (pageSize = 50) {
  const end = pageSize >= 50 ? 50 : pageSize
  return venues.slice(0, end)
}

async function getByLocation (coords, includeDistance = false, ratings) {
  const filteredVenues = filterByRatings(venues, ratings)
  const venuesOrderedByDistance = geolib.orderByDistance(coords, filteredVenues)

  if (!includeDistance) {
    return venuesOrderedByDistance
  }
  const venuesWithDistance = venuesOrderedByDistance.map(venue => {
    return { ...venue, distance: geolib.getDistance(coords, venue) }
  })
  return venuesWithDistance
}

module.exports = {
  getAll,
  getByLocation,
  init
}

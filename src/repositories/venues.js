const geolib = require('geolib')
const loadData = require('../lib/load-data')

let venues
async function init () {
  if (!venues) {
    console.log('Initialising venues repo...')
    venues = await loadData()
  }
}

async function getAll (pageSize = 50) {
  const end = pageSize >= 50 ? 50 : pageSize
  return venues.slice(0, end)
}

async function getByLocation (coords, includeDistance = false) {
  const venuesOrderedByDistance = geolib.orderByDistance(coords, venues)

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

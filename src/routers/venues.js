const express = require('express')
const geolib = require('geolib')
const venueRepo = require('../repositories/venue')

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await venueRepo.getAll()
  res.json(data)
})

router.get('/location/:lat/:lng', async (req, res) => {
  const { dist } = req.query
  const { lat, lng } = req.params
  const coord = { lat, lng }

  const venues = await venueRepo.getAll()
  const venuesOrderedByDistance = geolib.orderByDistance(coord, venues)

  if (dist === 'true') {
    const venuesWithDistance = venuesOrderedByDistance.map(venue => {
      return { ...venue, distance: geolib.getDistance(coord, venue) }
    })
    return res.json(venuesWithDistance)
  }
  return res.json(venuesOrderedByDistance)
})

module.exports = router

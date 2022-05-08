const express = require('express')
const venuesRepo = require('../repositories/venues')

const router = express.Router()
const path = '/venues'

function getPageSize (query) {
  const size = query.size
  return parseInt(size, 10) || 50
}

function getRatings (query) {
  const amenities = parseFloat(query.amenities) || 0
  const atmosphere = parseFloat(query.atmosphere) || 0
  const beer = parseFloat(query.beer) || 0
  const value = parseFloat(query.value) || 0
  return { amenities, atmosphere, beer, value }
}

function getIncludeDistance (query) {
  return query.dist === 'true'
}

function getCoords (params) {
  const { lat, lng } = params
  return { lat, lng }
}

router.get(`${path}/`, async (req, res) => {
  const pageSize = getPageSize(req.query)

  const data = await venuesRepo.getAll(pageSize)

  res.json(data)
})

router.get(`${path}/location/:lat/:lng`, async (req, res) => {
  // TODO: Validate coords
  const coords = getCoords(req.params)
  const includeDistance = getIncludeDistance(req.query)
  const ratings = getRatings(req.query)

  const venues = await venuesRepo.getByLocation(coords, includeDistance, ratings)

  res.json(venues)
})

module.exports = () => router

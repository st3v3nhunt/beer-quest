const express = require('express')
const venuesRepo = require('../repositories/venues')

const router = express.Router()

router.get('/', async (req, res) => {
  const size = req.query.size ?? 50
  const count = parseInt(size, 10)

  const data = await venuesRepo.getAll(count)
  res.json(data)
})

router.get('/location/:lat/:lng', async (req, res) => {
  const { dist } = req.query
  const { lat, lng } = req.params
  const coords = { lat, lng }

  const includeDistance = dist === 'true'
  const venues = await venuesRepo.getByLocation(coords, includeDistance)
  res.json(venues)
})

module.exports = router

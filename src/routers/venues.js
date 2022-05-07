const express = require('express')
const venueRepo = require('../repositories/venue')

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await venueRepo.getAll()
  res.json(data)
})

module.exports = router

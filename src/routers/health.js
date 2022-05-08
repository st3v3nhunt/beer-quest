const express = require('express')
const venueRepo = require('../repositories/venuec')

const router = express.Router()

router.get('/healthy', async (_, res) => {
  await venueRepo.init()
  res.send('ok')
})
router.get('/healthz', (_, res) => {
  res.send('ok')
})

module.exports = () => router

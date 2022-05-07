const express = require('express')
const venues = require('./routers/venues')
const venueRepo = require('./repositories/venue')

const app = express()

app.use('/venues', venues)

app.get('/healthy', async (_, res) => {
  await venueRepo.init()
  res.send('ok')
})

app.get('/healthz', (_, res) => {
  res.send('ok')
})

module.exports = app

const express = require('express')
const venueRepo = require('./repositories/venue')

const app = express()

app.get('/data', async (req, res) => {
  const data = await venueRepo.getAll()
  res.send(data)
})

module.exports = {
  app
}

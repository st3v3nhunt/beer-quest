const express = require('express')
const venues = require('./routers/venues')

const app = express()

app.use('/venues', venues)

module.exports = app

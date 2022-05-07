const express = require('express')
const health = require('./routers/health')
const venues = require('./routers/venues')

const app = express()

app.use('/venues', venues)
app.use(health())

module.exports = app

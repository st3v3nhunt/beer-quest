const app = require('./app')
const venueRepo = require('./repositories/venues')

const port = process.env.PORT

app.listen(port, async () => {
  await venueRepo.init()
  console.log(`App listening on port ${port}`)
})

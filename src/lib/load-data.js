const csv = require('csv-parser')
const fs = require('fs')

async function loadData () {
  const data = []
  console.time('load-data-took')
  const readable = fs.createReadStream('./data/leedsbeerquest.csv').pipe(csv())
  for await (const line of readable) {
    data.push(line)
  }
  console.timeEnd('load-data-took')
  return data
}

module.exports = loadData

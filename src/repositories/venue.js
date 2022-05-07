const { loadData } = require('../lib/load-data')

let data
async function init () {
  if (!data) {
    console.log('Initialising venue repo...')
    data = await loadData()
  }
}

async function getAll () {
  return data
}

module.exports = {
  getAll,
  init
}

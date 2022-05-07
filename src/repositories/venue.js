const { loadData } = require('../lib/load-data')

let data
async function init () {
  data = await loadData()
}

async function getAll () {
  return data
}

module.exports = {
  getAll,
  init
}

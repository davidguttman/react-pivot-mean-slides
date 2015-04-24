var Movie = require('../server/movie')

var movies = require('./movies.json')

var total = 0
var saved = 0

movies.forEach(function(m) {
  // console.log('m', m)
  total += 1
  // console.log('total', total)

  m._id = ['2011', m.title].join('!')
  var toRemove = ['audienceScore', 'nTheatersOpening', 'usBoxOfficeAvgOpeningWeekend', 
    'grossDomestic', 'grossForeign', 'profitability', 'oscar', 'bafta', 'openingWeekend']
  toRemove.forEach(function(k) {
    delete m[k]
  })

  var numbers = ['rottenTomatoesScore', 'grossWorldwide', 'budget']
  numbers.forEach(function(k) {
    // console.log('k', k)
    var val = m[k]
    if (!val) console.log('m', m)
    m[k] = toNumber(val)
  })

  var doc = new Movie(m)
  doc.save(function(err) {
    saved += 1
    if (saved == total) process.exit()
    if (err && err.code !== 11000) return console.error(err)
    // console.log('saved', saved)
  })
})

function toNumber (str) {
  return parseFloat(str.replace(/,/g, ''))
}

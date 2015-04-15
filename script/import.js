var Movie = require('../server/movie')

var movies = require('./movies.json')

var total = 0
var saved = 0

movies.forEach(function(m) {
  total += 1
  console.log('total', total)

  m._id = ['2011', m.title].join('!')
  var doc = new Movie(m)
  doc.save(function(err) {
    if (err) return console.error(err)
    saved += 1
    console.log('saved', saved)
  })
})

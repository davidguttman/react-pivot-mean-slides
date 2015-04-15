var csv     = require('csv')
var request = require('superagent')

module.exports = function(url, cb) {

  cRequest(url, function(err, body) {
    if (err) return cb(err)

    csvToArray(body, function(err, arr) {
      if (err) return cb(err)
      var json = csvArrayToJSON(arr)
      cb(null, json)
    })
  })

}

module.exports.cRequest = cRequest

function csvToArray (text, cb) {
  csv()
    .from.string(text)
    .to.array(function(array) {
      cb(null, array)
    })
}

function csvArrayToJSON (arr) {
  var columns = arr.shift()
  return arr.map(function(row) {
    var obj = {}
    row.forEach(function(val, i) {
      var col = columns[i]
      obj[col] = val
    })
    return obj
  })
}

function cRequest (url, cb) {
  if (localStorage[url]) return cb(null, localStorage[url])

  request(url, function(err, res) {
    if (err) return cb(err)
    localStorage[url] = res.text
    cb(null, res.text)
  })

}

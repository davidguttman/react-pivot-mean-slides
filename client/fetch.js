var jsonist = require('jsonist')

module.exports = function(url, cb) {
  if (!url.match(/^http/)) url = window.location.origin + url

  cRequest(url, cb)
}

function cRequest (url, cb) {
  if (localStorage[url]) return cb(null, JSON.parse(localStorage[url]))

  jsonist.get(url, function(err, res) {
    if (err) return cb(err)
    localStorage[url] = JSON.stringify(res)
    cb(null, res)
  })
}

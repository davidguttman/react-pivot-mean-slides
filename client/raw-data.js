module.exports = function() {
  var h = require('hyperscript')
  var raf = require('raf')
  var fetch = require('./fetch')

  var ta = h('textarea', {
    style: {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': (window.innerWidth - 10) + 'px',
      'height': (window.innerHeight - 10) + 'px',
      'border': 'none',
      'font-family': 'courier new',
      'pointer-events': 'none',
      'font-size': '150%'
    }
  })

  document.body.appendChild(ta)

  var url = '/data'

  fetch(url, function(err, parsed) {
    if (err) return console.error(err)
    var data = JSON.stringify(parsed, null, 2)
    var i = 0

    raf(addNext)

    var speed = 20
    var maxChars = 1000
    function addNext () {
      ta.value += data.substr(i, speed)
      i += speed

      if (i < maxChars) raf(addNext)
    }
  })
}

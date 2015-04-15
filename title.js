var cRequest = require('./fetch').cRequest

module.exports = function() {
  var h = require('hyperscript')

  document.body.appendChild(
    h('div.title', {
      style: {
        'text-align': 'center',
        'margin-top': window.innerHeight/4 + 'px',
        'font-size': '200%',
        'text-shadow': '#fff 0px 0px 10px'
      }},

      h('h1', 'Data-Centric Views'),
      h('h2', '@DavidGuttman')
    )
  )

  var ta = h('textarea', {
    style: {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': (window.innerWidth - 10) + 'px',
      'height': (window.innerHeight - 10) + 'px',
      'z-index': -1,
      'border': 'none',
      'opacity': 0.5,
      'font-family': 'courier new'
    }
  })

  document.body.appendChild(ta)

  var url = 'https://docs.google.com:443/spreadsheet/pub'
    + '?key=0ApW-j0QNGJesdDMwbmhqcFFSVFdfUXR0Vy1XeVdJX1E'
    + '&single=true&gid=28&output=csv'

  cRequest(url, function(err, data) {
    if (err) return console.error(err)
    var i = 0
    var interval = setInterval(function() {
      ta.value += data[i]
      i += 1
      if (i >= data.length) clearInterval(interval)
    }, 5)
  })
}

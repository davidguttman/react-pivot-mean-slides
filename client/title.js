var fetch = require('./fetch')

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
      'font-family': 'courier new',
      'pointer-events': 'none'
    }
  })

  document.body.appendChild(ta)

  var url = '/data'

  fetch(url, function(err, parsed) {
    if (err) return console.error(err)
    var data = JSON.stringify(parsed)
    var i = 0
    var interval = setInterval(function() {
      ta.value += data[i]
      i += 1
      if (i >= data.length) clearInterval(interval)
    }, 5)
  })
}

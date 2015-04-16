module.exports = function() {
  var h = require('hyperscript')

  document.body.appendChild(
    h('div', {style:{'text-align': 'center', 'padding-top': '15%', 'font-size': '200%'}},
      h('h1', 'Thank You!'),
      h('h3', '@DavidGuttman')
    )
  )
}

module.exports = function() {
  var h = require('hyperscript')

  document.body.appendChild(
    h('div', {style:{'text-align': 'center', 'padding': '10%', 'font-size': '200%'}},
      h('h1', 'Groups'),
      h('img', {src: '/data-driven.gif'})
    )
  )
}

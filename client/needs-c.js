module.exports = function() {
  var h = require('hyperscript')

  document.body.appendChild(
    h('div', {style:{'text-align': 'center', 'padding': '10%', 'font-size': '200%'}},
      h('h1', '"Nice to Have"')
    )
  )
}

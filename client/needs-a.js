module.exports = function() {
  var h = require('hyperscript')

  document.body.appendChild(
    h('div', {style:{'text-align': 'center', 'padding': '5%', 'font-size': '200%'}},
      h('h1', 'Sorting'),
      h('h1', 'Pagination'),
      h('h1', 'Cell Formatting'),
      h('h1', 'Human Friendly Columns')
    )
  )
}

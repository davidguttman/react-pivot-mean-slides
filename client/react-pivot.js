module.exports = function() {
  var h = require('hyperscript')

  document.body.appendChild(
    h('div', {style:{'text-align': 'center', 'padding-top': '20%', 'font-size': '200%'}},
      h('h3',
        h('a',
          {
            href: 'https://github.com/davidguttman/react-pivot',
            style: {'color': '#0F86D0'}

          },
          'github.com/davidguttman/react-pivot'
        )
      )
    )
  )
}

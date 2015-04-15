module.exports = function() {
  require('./hide-advanced')

  var ss = require('simple-statistics')
  var accounting = require('accounting')
  var ReactPivot = require('react-pivot/load')

  var fetch = require('./fetch')

  var url = '/data'

  var dimensions = [
    {title: 'Title', value: 'title', template: function(val, row) {
      return '<a href="'+row.source+'">'+val+'</a>'
    }}
  ]

  var reduce = function(row, memo) {
    memo = row
    memo.profit = toNumber(row.grossWorldwide) - toNumber(row.budget)
    memo.tomatoCost = toNumber(row.budget) / toNumber(row.rottenTomatoesScore)
    return memo
  }

  var calculations = [
    {title: 'Studio', value: 'studio'},
    {title: 'Genre', value: 'genre'},
    {title: 'Budget', className: 'right', value: function(row) {return toNumber(row.budget)}, template: fMoney},
    {title: 'Gross', className: 'right', value: function(row) {return toNumber(row.grossWorldwide)}, template: fMoney},
    {title: 'Profit', className: 'right', value: 'profit', template: rgMoney},
    {title: 'Tomatoes', className: 'right', value: 'rottenTomatoesScore'},
    {title: '$/Tomato', className: 'right', value: 'tomatoCost', template: fMoney}
  ]

  fetch(url, function(err, rawData) {
    if (err) return console.error(err)
    console.log('rawData', rawData)

    ReactPivot(document.body, {
      rows: rawData,
      dimensions: dimensions,
      reduce: reduce,
      calculations: calculations,
      activeDimensions: ['Title'],
      sortBy: 'Title'
    })
  })

  function fMoney (val) {
    return accounting.formatMoney(val)
  }

  function fNumber (val) {
    return accounting.formatNumber(val)
  }

  function toNumber (str) {
    return parseFloat(str.replace(/,/g, ''))
  }

  function rgMoney (val) {
    if (val >= 0) return '<span style="color: green">'+fMoney(val)+'</span>'
    return '<span style="color: red">'+fMoney(val)+'</span>'
  }

}

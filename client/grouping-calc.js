module.exports = function() {

  var ss = require('simple-statistics')
  var accounting = require('accounting')
  var ReactPivot = require('react-pivot/load')

  var fetch = require('./fetch')

  var url = '/data'

  var dimensions = [
    {title: 'Title', value: 'title', template: function(val, row) {
      return '<a href="'+row.source+'">'+val+'</a>'
    }},
    {title: 'Studio', value: 'studio'},
    {title: 'Genre', value: 'genre'},
    {title: 'Story', value: 'story'}
  ]

  var reduce = function(row, memo) {
    memo.count = memo.count || 0
    memo.count += 1

    memo.budget = memo.budget || 0
    memo.budget += row.budget

    memo.gross = memo.gross || 0
    memo.gross += row.grossWorldwide

    memo.profit = memo.profit || 0
    memo.profit += row.grossWorldwide - row.budget

    memo.rottenTomatoesScore = memo.rottenTomatoesScore || 0
    memo.rottenTomatoesScore += row.rottenTomatoesScore

    memo.budgetAvg = memo.budget / memo.count
    memo.grossAvg = memo.gross / memo.count
    memo.profitAvg = memo.profit / memo.count

    memo.tomatoAvg = memo.rottenTomatoesScore / memo.count
    memo.tomatoCost = memo.budget / memo.rottenTomatoesScore

    return memo
  }

  var calculations = [
    {title: 'Budget', className: 'right', value: 'budget', template: fMoney},
    {title: 'Budget Avg', className: 'right', value: 'budgetAvg', template: fMoney},
    {title: 'Gross', className: 'right', value: 'gross', template: fMoney},
    {title: 'Gross Avg', className: 'right', value: 'grossAvg', template: fMoney},
    {title: 'Profit', className: 'right', value: 'profit', template: rgMoney},
    {title: 'Profit Avg', className: 'right', value: 'profitAvg', template: rgMoney},
    {title: 'Tomatoes', className: 'right', value: 'tomatoAvg', template: fNumber},
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
      activeDimensions: ['Studio'],
      sortBy: 'Studio'
    })
  })

  function fMoney (val) {
    if (typeof val === 'string') return val
    return accounting.formatMoney(val)
  }

  function fNumber (val) {
    return accounting.formatNumber(val)
  }

  function rgMoney (val) {
    if (val >= 0) return '<span style="color: green">'+fMoney(val)+'</span>'
    return '<span style="color: red">'+fMoney(val)+'</span>'
  }

}

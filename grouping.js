module.exports = function() {

  var ss = require('simple-statistics')
  var accounting = require('accounting')
  var ReactPivot = require('react-pivot/load')

  var fetch = require('./fetch')

  var url = 'https://docs.google.com:443/spreadsheet/pub'
    + '?key=0ApW-j0QNGJesdDMwbmhqcFFSVFdfUXR0Vy1XeVdJX1E'
    + '&single=true&gid=28&output=csv'

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
    memo.budget += toNumber(row.budget)

    memo.gross = memo.gross || 0
    memo.gross += toNumber(row.grossWorldwide)

    memo.profit = memo.profit || 0
    memo.profit += toNumber(row.grossWorldwide) - toNumber(row.budget)

    // memo.rottenTomatoesScore = memo.rottenTomatoesScore || 0
    // memo.rottenTomatoesScore += toNumber(row.rottenTomatoesScore)

    if (memo.count === 1) {
      memo.rottenTomatoesScore = toNumber(row.rottenTomatoesScore)
      memo.tomatoCost = memo.budget / memo.rottenTomatoesScore
    } else {
      memo.rottenTomatoesScore = '???'
      memo.tomatoCost = '???'
    }

    return memo
  }

  var calculations = [
    {title: 'Budget', className: 'right', value: 'budget', template: fMoney},
    {title: 'Gross', className: 'right', value: 'gross', template: fMoney},
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

  function toNumber (str) {
    return parseFloat(str.replace(/,/g, ''))
  }

  function rgMoney (val) {
    if (val >= 0) return '<span style="color: green">'+fMoney(val)+'</span>'
    return '<span style="color: red">'+fMoney(val)+'</span>'
  }

}

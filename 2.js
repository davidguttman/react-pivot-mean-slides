module.exports = function() {

  var ss = require('simple-statistics')
  var accounting = require('accounting')
  var ReactPivot = require('react-pivot/load')

  var fetch = require('./fetch')

  var url = 'https://docs.google.com:443/spreadsheet/pub'
    + '?key=0ApW-j0QNGJesdDMwbmhqcFFSVFdfUXR0Vy1XeVdJX1E'
    + '&single=true&gid=28&output=csv'

  var dimensions = [
    {title: 'Genre', value: 'genre'},
    {title: 'Story', value: 'story'},
    {title: 'Studio', value: 'studio'},
    {title: 'Title', value: 'title'}
  ]

  var reduce = function(row, memo) {
    memo.count = memo.count || 0
    memo.count += 1

    memo.budgets = memo.budgets || []
    memo.budgets.push(toNumber(row.budget))

    memo.grosses = memo.grosses || []
    memo.grosses.push(toNumber(row.grossWorldwide))

    memo.scores = memo.scores || []
    memo.scores.push(toNumber(row.rottenTomatoesScore))

    memo.budgetsSum = ss.sum(memo.budgets)
    memo.budgetsAvg = ss.mean(memo.budgets)

    memo.grossesSum = ss.sum(memo.grosses)
    memo.grossesAvg = ss.mean(memo.grosses)

    memo.profitSum = memo.grossesSum - memo.budgetsSum
    memo.profitAvg = memo.profitSum / memo.count

    memo.scoresSum = ss.sum(memo.scores)
    memo.scoresAvg = ss.mean(memo.scores)

    memo.scoreCost = memo.budgetsSum / memo.scoresSum

    return memo
  }

  var calculations = [
    {title: 'Count', value: 'count'},
    {title: 'Budget Total', value: 'budgetsSum', template: fMoney},
    {title: 'Budget Avg', value: 'budgetsAvg', template: fMoney},
    {title: 'Gross Total', value: 'grossesSum', template: fMoney},
    {title: 'Gross Avg', value: 'grossesAvg', template: fMoney},
    {title: 'Profit Total', value: 'profitSum', template: fMoney},
    {title: 'Profit Avg', value: 'profitAvg', template: fMoney},
    {title: 'Score Avg', value: 'scoresAvg', template: fNumber},
    {title: 'Score Cost', value: 'scoreCost', template: fMoney}
  ]

  fetch(url, function(err, rawData) {
    if (err) return console.error(err)
    console.log('rawData', rawData)

    ReactPivot(document.body, {
      rows: rawData,
      dimensions: dimensions,
      reduce: reduce,
      calculations: calculations
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

}

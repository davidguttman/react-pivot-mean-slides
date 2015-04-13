module.exports = function() {
  require('./hide-advanced')

  var ss = require('simple-statistics')
  var accounting = require('accounting')
  var ReactPivot = require('react-pivot/load')

  var fetch = require('./fetch')

  var url = 'https://docs.google.com:443/spreadsheet/pub'
    + '?key=0ApW-j0QNGJesdDMwbmhqcFFSVFdfUXR0Vy1XeVdJX1E'
    + '&single=true&gid=28&output=csv'

  var dimensions = [
    {title: 'Title', value: 'title'}
  ]

  var reduce = function(row, memo) {
    memo = row
    return memo
  }

  var calculations = [
    {title: 'Studio', value: 'studio'},
    {title: 'Genre', value: 'genre'},
    {title: 'Budget', value: function(row) {return toNumber(row.budget)}, template: fMoney},
    {title: 'Gross', value: function(row) {return toNumber(row.grossWorldwide)}, value: 'grossWorldwide', template: fMoney},
    {title: 'Tomatoes', value: 'rottenTomatoesScore'}
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

}


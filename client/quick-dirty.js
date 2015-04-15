module.exports = function() {
  var fetch = require('./fetch')

  var table = document.createElement('table')
  var thead = document.createElement('thead')
  var tbody = document.createElement('tbody')
  var colRow = document.createElement('tr')

  table.appendChild(thead)
  table.appendChild(tbody)

  thead.appendChild(colRow)
  document.body.appendChild(table)

  var url = '/data'
  fetch(url, function(err, rows) {
    if (err) return console.error(err)

    var cols = Object.keys(rows[0])
    cols.forEach(function(col) {
      var th = document.createElement('th')
      th.innerHTML = col
      colRow.appendChild(th)
    })

    rows.forEach(function(row) {
      var tr = document.createElement('tr')
      cols.forEach(function(col) {
        var td = document.createElement('td')
        td.innerHTML = row[col]
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })

  })

}

var pages = [
  require('./no-frills-table'),
  require('./no-frills-plus-computed'),
  require('./no-frills-rg'),
  require('./grouping'),
  require('./grouping-calc')
  // require('./2')
]

window.onhashchange = function() {window.location.reload()}

var hash = window.location.hash.replace(/^#\/?/g, '')
if (!hash) window.location = '#/1'

var nPage = hash - 1
pages[nPage]()

window.addEventListener('keyup', function(evt) {
  if (evt.keyIdentifier === 'Left') return prevPage()
  if (evt.keyIdentifier === 'Right') return nextPage()
})

function nextPage () { if (pages[nPage + 1]) window.location = '#/' + (nPage+2) }
function prevPage () { if (pages[nPage - 1]) window.location = '#/' + nPage }

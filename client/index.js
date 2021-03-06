require('./style.css')

document.title = 'Data-Centric Views'

var pages = [
  require('./jsla'),
  require('./title'),
  require('./raw-data'),
  require('./stream-code'),
  require('./stream-gif'),
  require('./raw-data'),
  require('./quick-dirty'),
  require('./needs-a'),
  require('./no-frills-table'),
  require('./needs-b'),
  require('./no-frills-plus-computed'),
  require('./needs-c'),
  require('./no-frills-rg'),
  require('./needs-d'),
  require('./grouping'),
  require('./grouping-calc'),
  require('./final-code'),
  require('./react-pivot'),
  require('./thankyou'),
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

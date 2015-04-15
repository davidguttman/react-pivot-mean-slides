module.exports = function() {
  var iframe = document.createElement('iframe')

  iframe.src = 'http://js.la'
  iframe.style.width = '100%'
  iframe.style.height = (window.innerHeight-4) + 'px'
  iframe.style.border = 'none'
  iframe.style.pointerEvents = 'none'
  iframe.scrolling = 'no'

  document.body.appendChild(iframe)
}

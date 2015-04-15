module.exports = function() {
  var iframe = document.createElement('iframe')

  iframe.src = 'https://docs.google.com/spreadsheet/ccc?key=0ApW-j0QNGJesdDMwbmhqcFFSVFdfUXR0Vy1XeVdJX1E#gid=28'
  iframe.style.width = '100%'
  iframe.style.height = (window.innerHeight-4) + 'px'
  iframe.style.border = 'none'
  iframe.style.pointerEvents = 'none'
  iframe.scrolling = 'no'

  document.body.appendChild(iframe)
}

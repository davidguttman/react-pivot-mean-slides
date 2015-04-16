module.exports = function() {
  var img = document.createElement('img')

  document.body.style.textAlign = 'center'
  document.body.style.padding = '10%'

  img.src = '/stream-animation.gif'
  document.body.appendChild(img)
}

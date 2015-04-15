var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

var Movie = mongoose.model('Movie', new mongoose.Schema({_id: String}, {strict:false}))

module.exports = Movie

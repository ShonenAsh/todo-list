const mongoose = require('mongoose');

var News = mongoose.model('News', {
    name: { type: String },
    date: { type: String },
    category: { type: String },
    place: { type: String }
});

module.exports = { News };
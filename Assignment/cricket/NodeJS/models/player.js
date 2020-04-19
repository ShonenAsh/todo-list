const mongoose = require('mongoose');

var Player = mongoose.model('Player', {
    name: { type: String },
    doj: { type: String },
    dob: { type: String },
    matches: { type: Number }
});

module.exports = { Player };
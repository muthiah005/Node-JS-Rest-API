const mongoose = require('mongoose');

const tab = mongoose.Schema({
    name: String,
    description:String
});

module.exports = mongoose.model('tab', tab);
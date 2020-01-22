const mongoose = require('mongoose');

const Product = mongoose.Schema({
    name: String,
    description:String,
    price:String
});

module.exports = mongoose.model('Product', Product);
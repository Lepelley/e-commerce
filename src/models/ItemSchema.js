const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('item', schema)

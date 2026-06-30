const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    bookName: { type: String, required: true },
    author: { type: String },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  }],
  shipping: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  payment: { type: String, default: 'cod' },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)
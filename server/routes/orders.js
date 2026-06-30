const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Order = require('../models/Order')

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'No token, access denied' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

router.post('/', auth, async (req, res) => {
  try {
    const { items, shipping, payment, total } = req.body
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }
    const order = await Order.create({ user: req.userId, items, shipping, payment, total })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
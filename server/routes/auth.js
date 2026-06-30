const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if email exists
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ error: 'Email already exists' })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({ name, email, password: hashedPassword })

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })

  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check user
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Wrong email or password' })

    // Check password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: 'Wrong email or password' })

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })

  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const auth = require('../middleware/auth')

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('user', 'name email')
    res.json(books)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// ADD book (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { bookName, author, price } = req.body
    const book = await Book.create({
      bookName, author, price,
      user: req.user.id
    })
    res.json(book)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE book (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.json({ message: 'Book deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
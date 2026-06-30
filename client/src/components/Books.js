import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Books() {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [books, setBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books')
      const data = await response.json()
      setBooks(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log('Error fetching books:', err)
    }
  }

  const addBook = async () => {
    if (!currentUser) { alert('Please login first'); return }
    if (!bookName || !author || !price) { alert('Please fill all fields'); return }
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
        body: JSON.stringify({ bookName, author, price })
      })
      const newBook = await response.json()
      setBooks([...books, newBook])
      setBookName(''); setAuthor(''); setPrice('')
    } catch (err) { alert('Something went wrong!') }
  }

  const deleteBook = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
        headers: { 'auth-token': localStorage.getItem('token') }
      })
      setBooks(books.filter(book => book._id !== id))
    } catch (err) { alert('Error deleting book!') }
  }

  const addToCart = (book) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || []
    const exists = existingCart.find(item => item._id === book._id)
    if (exists) { alert('Already in cart!'); return }
    const updatedCart = [...existingCart, { ...book, qty: 1 }]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCart(updatedCart)
    setAdded(book._id)
    setTimeout(() => setAdded(''), 2000)
  }

  const filteredBooks = books.filter(book =>
    book.bookName?.toLowerCase().includes(search.toLowerCase()) ||
    book.author?.toLowerCase().includes(search.toLowerCase())
  )

  const emojis = ['📘', '📗', '📕', '📙', '📒', '📔']

  return (
    <div style={{ background: '#fff7ed', minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ background: 'linear-gradient(135deg, #fff7ed, #fef9c3)', padding: '60px 0 40px', borderBottom: '2px solid #fed7aa' }}>
        <div className="container text-center">
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontSize: '2.5rem', marginBottom: '10px' }}>
            📚 Books <span style={{ color: '#f97316' }}>Marketplace</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '20px' }}>
            Buy and sell books with fellow readers
          </p>
          {/* Search */}
          <div className="d-flex justify-content-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
              <input
                type="text"
                placeholder="Search by book name or author..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '12px 20px 12px 45px', borderRadius: '50px', border: '2px solid #fed7aa', outline: 'none', fontSize: '0.95rem', background: '#ffffff' }}
              />
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
            </div>
          </div>
          {/* Cart Button */}
          <div className="mt-3">
            <button onClick={() => navigate('/cart')} className="btn btn-sm px-4"
              style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '600' }}>
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-5">

          {/* ===== LEFT - ADD BOOK ===== */}
          <div className="col-12 col-lg-4">
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '30px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(249,115,22,0.08)', position: 'sticky', top: '80px' }}>
              <h4 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '20px', borderBottom: '2px solid #fed7aa', paddingBottom: '12px' }}>
                📝 Sell Your Book
              </h4>

              {!currentUser ? (
                <div className="text-center py-3">
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔐</div>
                  <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '0.9rem' }}>Login to list your books for sale</p>
                  <Link to="/login" className="btn w-100 mb-2"
                    style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '600' }}>
                    Login
                  </Link>
                  <Link to="/signup" className="btn w-100"
                    style={{ background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa', borderRadius: '50px', fontWeight: '600' }}>
                    Sign Up
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Book Name</label>
                    <input type="text" className="form-control" placeholder="Enter book name"
                      value={bookName} onChange={e => setBookName(e.target.value)}
                      style={{ borderRadius: '10px', border: '1.5px solid #fed7aa', padding: '10px 14px' }} />
                  </div>
                  <div className="mb-3">
                    <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Author Name</label>
                    <input type="text" className="form-control" placeholder="Enter author name"
                      value={author} onChange={e => setAuthor(e.target.value)}
                      style={{ borderRadius: '10px', border: '1.5px solid #fed7aa', padding: '10px 14px' }} />
                  </div>
                  <div className="mb-4">
                    <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Price (Rs)</label>
                    <input type="number" className="form-control" placeholder="Enter price"
                      value={price} onChange={e => setPrice(e.target.value)}
                      style={{ borderRadius: '10px', border: '1.5px solid #fed7aa', padding: '10px 14px' }} />
                  </div>
                  <button onClick={addBook} className="btn w-100"
                    style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '700', padding: '12px' }}>
                    + List Book for Sale
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ===== RIGHT - BOOKS LIST ===== */}
          <div className="col-12 col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '0' }}>
                All Books <span style={{ color: '#f97316', fontSize: '1rem' }}>({filteredBooks.length})</span>
              </h4>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</div>
                <p style={{ color: '#6b7280' }}>No books found. Be the first to add one!</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredBooks.map((book, index) => (
                  <div className="col-12 col-md-6" key={book._id}>
                    <div style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #fed7aa', boxShadow: '0 2px 12px rgba(249,115,22,0.08)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(249,115,22,0.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(249,115,22,0.08)'; }}>

                      {/* Book Cover */}
                      <div style={{ background: 'linear-gradient(135deg, #fff7ed, #fef9c3)', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '4rem' }}>{emojis[index % emojis.length]}</span>
                      </div>

                      <div style={{ padding: '20px' }}>
                        <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontWeight: '700', marginBottom: '4px', fontSize: '1rem' }}>
                          {book.bookName}
                        </h5>
                        <p style={{ color: '#f97316', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px' }}>
                          by {book.author}
                        </p>
                        {book.user && (
                          <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: '12px' }}>
                            Seller: {book.user.name}
                          </p>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                          <span style={{ color: '#111827', fontWeight: '800', fontSize: '1.1rem' }}>
                            Rs {book.price}
                          </span>
                          <div className="d-flex gap-2">
                            {currentUser && book.user?._id === currentUser.id && (
                              <button onClick={() => deleteBook(book._id)} className="btn btn-sm"
                                style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '50px', fontSize: '0.8rem' }}>
                                🗑️ Delete
                              </button>
                            )}
                            <button onClick={() => addToCart(book)} className="btn btn-sm px-3"
                              style={{ background: added === book._id ? '#d1fae5' : '#fff7ed', color: added === book._id ? '#059669' : '#f97316', border: `1px solid ${added === book._id ? '#6ee7b7' : '#fed7aa'}`, borderRadius: '50px', fontWeight: '600', fontSize: '0.8rem', transition: 'all 0.3s' }}>
                              {added === book._id ? '✅ Added' : '🛒 Add to Cart'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
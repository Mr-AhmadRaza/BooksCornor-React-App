import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item._id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return
    const updated = cart.map(item => item._id === id ? { ...item, qty } : item)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0)

  return (
    <div style={{ background: '#fff7ed', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">

        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-5">
          <button onClick={() => navigate('/books')} style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '50px', padding: '8px 16px', color: '#f97316', fontWeight: '600', cursor: 'pointer' }}>
            ← Back
          </button>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '0' }}>
            🛒 Your Cart <span style={{ color: '#f97316', fontSize: '1rem' }}>({cart.length} items)</span>
          </h2>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🛒</div>
            <h4 style={{ color: '#111827', marginBottom: '10px' }}>Your cart is empty!</h4>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Browse books and add them to your cart</p>
            <Link to="/books" className="btn px-5 py-2"
              style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '700' }}>
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="row g-4">

            {/* Cart Items */}
            <div className="col-12 col-lg-8">
              {cart.map((item, index) => (
                <div key={item._id} style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', marginBottom: '16px', border: '1px solid #fed7aa', boxShadow: '0 2px 12px rgba(249,115,22,0.06)' }}>
                  <div className="d-flex align-items-center gap-4">

                    {/* Book Emoji */}
                    <div style={{ background: 'linear-gradient(135deg, #fff7ed, #fef9c3)', borderRadius: '12px', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0', fontSize: '2.5rem' }}>
                      📚
                    </div>

                    {/* Book Info */}
                    <div style={{ flex: 1 }}>
                      <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '4px', fontSize: '1rem' }}>
                        {item.bookName}
                      </h5>
                      <p style={{ color: '#f97316', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px' }}>
                        by {item.author}
                      </p>
                      <div className="d-flex align-items-center gap-3">
                        {/* Qty Controls */}
                        <div className="d-flex align-items-center gap-2">
                          <button onClick={() => updateQty(item._id, item.qty - 1)}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #fed7aa', background: '#fff7ed', color: '#f97316', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            -
                          </button>
                          <span style={{ fontWeight: '700', color: '#111827', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item._id, item.qty + 1)}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #fed7aa', background: '#fff7ed', color: '#f97316', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            +
                          </button>
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                          Rs {item.price} each
                        </span>
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="text-end">
                      <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#111827', marginBottom: '8px' }}>
                        Rs {Number(item.price) * item.qty}
                      </div>
                      <button onClick={() => removeFromCart(item._id)}
                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '50px', padding: '4px 14px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}>
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="col-12 col-lg-4">
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(249,115,22,0.08)', position: 'sticky', top: '80px' }}>
                <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #fed7aa' }}>
                  Order Summary
                </h5>

                {cart.map(item => (
                  <div key={item._id} className="d-flex justify-content-between mb-2">
                    <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{item.bookName} × {item.qty}</span>
                    <span style={{ color: '#111827', fontWeight: '600', fontSize: '0.85rem' }}>Rs {Number(item.price) * item.qty}</span>
                  </div>
                ))}

                <hr style={{ borderColor: '#fed7aa' }} />

                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: '#374151', fontWeight: '600' }}>Subtotal</span>
                  <span style={{ color: '#111827', fontWeight: '700' }}>Rs {total}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span style={{ color: '#374151', fontWeight: '600' }}>Delivery</span>
                  <span style={{ color: '#059669', fontWeight: '600' }}>Free 🎉</span>
                </div>

                <div className="d-flex justify-content-between mb-4 p-3"
                  style={{ background: '#fff7ed', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                  <span style={{ color: '#111827', fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
                  <span style={{ color: '#f97316', fontWeight: '800', fontSize: '1.2rem' }}>Rs {total}</span>
                </div>

                <button onClick={() => navigate('/checkout')} className="btn w-100"
                  style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '700', padding: '14px', fontSize: '1rem', boxShadow: '0 4px 15px rgba(249,115,22,0.35)' }}>
                  Proceed to Checkout →
                </button>

                <Link to="/books" className="btn w-100 mt-3"
                  style={{ background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa', borderRadius: '50px', fontWeight: '600', padding: '10px' }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
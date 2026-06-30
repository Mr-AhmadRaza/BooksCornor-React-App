import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', payment: 'cod' });
  const [ordered, setOrdered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (user.name) setForm(f => ({ ...f, name: user.name, email: user.email || '' }))
  }, [])

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const placeOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      alert('Please fill all fields!')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to place an order')
      navigate('/login')
      return
    }

    try {
const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            bookId: item._id,
            bookName: item.bookName,
            author: item.author,
            price: item.price,
            qty: item.qty,
          })),
          shipping: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
          },
          payment: form.payment,
          total,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Failed to place order')
        return
      }

      localStorage.removeItem('cart')
      setOrdered(true)
    } catch (err) {
      alert('Network error, please try again')
    }
  }
  if (ordered) return (
    <div style={{ background: '#fff7ed', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center" style={{ background: '#ffffff', borderRadius: '20px', padding: '60px 40px', border: '1px solid #fed7aa', boxShadow: '0 8px 30px rgba(249,115,22,0.1)', maxWidth: '450px' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
        <h3 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '12px' }}>Order Placed!</h3>
        <p style={{ color: '#6b7280', marginBottom: '8px' }}>Thank you for your order.</p>
        <p style={{ color: '#6b7280', marginBottom: '28px', fontSize: '0.9rem' }}>
          Total paid: <strong style={{ color: '#f97316' }}>Rs {total}</strong>
        </p>
        <button onClick={() => navigate('/')} className="btn px-5 py-2"
          style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '700' }}>
          Back to Home
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#fff7ed', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">

        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-5">
          <button onClick={() => navigate('/cart')} style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '50px', padding: '8px 16px', color: '#f97316', fontWeight: '600', cursor: 'pointer' }}>
            ← Back to Cart
          </button>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '0' }}>
            🧾 Checkout
          </h2>
        </div>

        <div className="row g-4">

          {/* Shipping Form */}
          <div className="col-12 col-lg-7">
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '30px', border: '1px solid #fed7aa', boxShadow: '0 2px 12px rgba(249,115,22,0.06)' }}>
              <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #fed7aa' }}>
                📦 Shipping Information
              </h5>

              <div className="row g-3">
                <div className="col-12">
                  <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #fed7aa', outline: 'none', fontSize: '0.9rem' }} />
                </div>
                <div className="col-md-6">
                  <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Enter your email"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #fed7aa', outline: 'none', fontSize: '0.9rem' }} />
                </div>
                <div className="col-md-6">
                  <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="03XX-XXXXXXX"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #fed7aa', outline: 'none', fontSize: '0.9rem' }} />
                </div>
                <div className="col-12">
                  <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Address</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange}
                    placeholder="Street address, house no."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #fed7aa', outline: 'none', fontSize: '0.9rem' }} />
                </div>
                <div className="col-12">
                  <label style={{ color: '#374151', fontWeight: '500', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>City</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange}
                    placeholder="Your city"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #fed7aa', outline: 'none', fontSize: '0.9rem' }} />
                </div>
              </div>

              {/* Payment Method */}
              <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', margin: '28px 0 16px', paddingBottom: '12px', borderBottom: '2px solid #fed7aa' }}>
                💳 Payment Method
              </h5>

              <div className="d-flex flex-column gap-3">
                {[
                  { value: 'cod', label: '💵 Cash on Delivery', desc: 'Pay when you receive your order' },

                ].map(method => (
                  <label key={method.value} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '18px', border: `2px solid ${form.payment === method.value ? '#f97316' : '#fed7aa'}`, background: form.payment === method.value ? '#fff7ed' : '#ffffff', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <input type="radio" name="payment" value={method.value}
                      checked={form.payment === method.value} onChange={handleChange}
                      style={{ accentColor: '#f97316' }} />
                    <div>
                      <div style={{ fontWeight: '600', color: '#111827', fontSize: '0.9rem' }}>{method.label}</div>
                      <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-5">
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(249,115,22,0.08)', position: 'sticky', top: '80px' }}>
              <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #fed7aa' }}>
                📋 Order Summary
              </h5>

              {cart.map(item => (
                <div key={item._id} className="d-flex justify-content-between align-items-center mb-3">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>📚</span>
                    <div>
                      <div style={{ color: '#111827', fontWeight: '600', fontSize: '0.85rem' }}>{item.bookName}</div>
                      <div style={{ color: '#9ca3af', fontSize: '0.78rem' }}>Qty: {item.qty}</div>
                    </div>
                  </div>
                  <span style={{ color: '#111827', fontWeight: '700', fontSize: '0.9rem' }}>
                    Rs {Number(item.price) * item.qty}
                  </span>
                </div>
              ))}

              <hr style={{ borderColor: '#fed7aa' }} />

              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>Rs {total}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#6b7280' }}>Delivery</span>
                <span style={{ color: '#059669', fontWeight: '600' }}>Free 🎉</span>
              </div>

              <div className="d-flex justify-content-between mb-4 p-3"
                style={{ background: '#fff7ed', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#111827' }}>Total</span>
                <span style={{ fontWeight: '800', fontSize: '1.2rem', color: '#f97316' }}>Rs {total}</span>
              </div>

              <button onClick={placeOrder} className="btn w-100"
                style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '700', padding: '14px', fontSize: '1rem', boxShadow: '0 4px 15px rgba(249,115,22,0.35)' }}>
                🎉 Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
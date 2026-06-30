import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const iqbalBooks = [
  {
    _id: 'iq1',
    bookName: 'Bang-e-Dra',
    urduName: 'بانگِ درا',
    author: 'علامہ اقبال',
    price: 450,
    bgColor: '#1a472a',
    textColor: '#ffd700',
    urduDesc: `بانگِ درا علامہ اقبال کا پہلا اردو شعری مجموعہ ہے۔\nیہ کتاب 1924 میں شائع ہوئی تھی۔\nاس میں وطن سے محبت کے گیت شامل ہیں۔\nترانہ ہندی اور ترانہ ملی اسی کتاب میں ہیں۔\nاقبال نے اس میں فطرت کی خوبصورتی بیان کی ہے۔\nبچوں کے لیے بھی خوبصورت نظمیں اس میں شامل ہیں۔\nاس کتاب میں تین ادوار کی شاعری شامل ہے۔\nپہلے دور میں قومی شاعری غالب ہے۔\nدوسرے دور میں فلسفیانہ خیالات ہیں۔\nتیسرے دور میں اسلامی فکر نمایاں ہے۔`,
  },
  {
    _id: 'iq2',
    bookName: 'Bal-e-Jibreel',
    urduName: 'بالِ جبریل',
    author: 'علامہ اقبال',
    price: 480,
    bgColor: '#1a1a6e',
    textColor: '#ffffff',
    urduDesc: `بالِ جبریل اقبال کا سب سے مقبول شعری مجموعہ ہے۔\nیہ 1935 میں شائع ہوا تھا۔\nاس میں غزلیں، نظمیں اور قطعات شامل ہیں۔\nمسجد قرطبہ اس کتاب کی سب سے مشہور نظم ہے۔\nاقبال نے اس میں عشق کا گہرا فلسفہ بیان کیا ہے۔\nروحانی موضوعات اس کتاب کا خاص حصہ ہیں۔\nاس میں خودی کے تصور کو شاعری میں پیش کیا گیا ہے۔\nاسپین کا سفر اس کتاب کی بنیاد بنا۔\nاس میں مسلمانوں کے عروج و زوال کا ذکر ہے۔\nیہ اردو ادب کا ایک لازوال شاہکار ہے۔`,
  },
  {
    _id: 'iq3',
    bookName: 'Armughan-e-Hijaz',
    urduName: 'ارمغانِ حجاز',
    author: 'علامہ اقبال',
    price: 420,
    bgColor: '#8b0000',
    textColor: '#ffd700',
    urduDesc: `ارمغانِ حجاز اقبال کی آخری شعری کتاب ہے۔\nیہ ان کی وفات کے بعد 1938 میں شائع ہوئی۔\nاس میں فارسی اور اردو دونوں زبانوں میں شاعری ہے۔\nابلیس کی مجلسِ شوریٰ اس کا اہم حصہ ہے۔\nاقبال نے اس میں مسلمانوں کو پیغام دیا ہے۔\nاس کتاب میں حجاز کی یاد اور محبت ہے۔\nیہ اقبال کی روحانی کیفیت کی عکاسی کرتی ہے۔\nاس میں مسلم دنیا کے مسائل بیان ہوئے ہیں۔\nاقبال کی حجاز جانے کی تمنا اس میں جھلکتی ہے۔\nیہ ان کی زندگی کا آخری پیغام ہے۔`,
  },
  {
    _id: 'iq4',
    bookName: 'Zarb-e-Kaleem',
    urduName: 'ضربِ کلیم',
    author: 'علامہ اقبال',
    price: 460,
    bgColor: '#4a0072',
    textColor: '#ffffff',
    urduDesc: `ضربِ کلیم 1936 میں شائع ہوئی۔\nاس کا مطلب ہے موسیٰ کی لاٹھی کا وار۔\nاس میں مغربی تہذیب پر کڑی تنقید ہے۔\nاقبال نے اس میں مسلمانوں کو جگانے کی کوشش کی۔\nسرمایہ داری اور سامراج کے خلاف آواز اٹھائی گئی ہے۔\nاس میں نوجوانوں کے لیے خاص پیغامات ہیں۔\nفلسفہ خودی کو مزید گہرائی سے بیان کیا گیا ہے۔\nاس کتاب میں انقلابی سوچ موجود ہے۔\nمسلم امہ کی بیداری اس کا مرکزی خیال ہے۔\nیہ اقبال کی بہترین سیاسی شاعری ہے۔`,
  },
  {
    _id: 'iq5',
    bookName: 'Asrar-e-Khudi',
    urduName: 'اسرارِ خودی',
    author: 'علامہ اقبال',
    price: 499,
    bgColor: '#b8860b',
    textColor: '#ffffff',
    urduDesc: `اسرارِ خودی فارسی زبان میں لکھی گئی ہے۔\nیہ 1915 میں شائع ہوئی تھی۔\nاس میں خودی یعنی ذاتی شناخت کا فلسفہ ہے۔\nاقبال نے بتایا کہ انسان اپنی خودی کو مضبوط کرے۔\nیہ کتاب مشرق و مغرب میں بہت مشہور ہوئی۔\nنکلسن نے اس کا انگریزی ترجمہ کیا۔\nاس میں رومی کے افکار کا اثر نمایاں ہے۔\nخودی کی تعمیر اور تخریب دونوں بیان ہیں۔\nیہ اقبال کے فلسفے کی بنیاد ہے۔\nاس نے اقبال کو عالمی شہرت دلائی۔`,
  },
  {
    _id: 'iq6',
    bookName: 'Rumuz-e-Bekhudi',
    urduName: 'رموزِ بیخودی',
    author: 'علامہ اقبال',
    price: 470,
    bgColor: '#006400',
    textColor: '#ffd700',
    urduDesc: `رموزِ بیخودی فارسی شاعری کا مجموعہ ہے۔\nیہ 1918 میں شائع ہوئی تھی۔\nاسرارِ خودی کا یہ تسلسل ہے۔\nاس میں اجتماعی زندگی کا فلسفہ ہے۔\nفرد سے معاشرے کی طرف سفر اس کا موضوع ہے۔\nاسلامی اقدار اور ملی زندگی بیان کی گئی ہے۔\nاقبال نے امت مسلمہ کا تصور پیش کیا ہے۔\nقومی یکجہتی اس کا مرکزی خیال ہے۔\nاس میں وطن کی محبت کو بھی اہمیت دی گئی ہے۔\nیہ معاشرتی فلسفے کی بہترین کتاب ہے۔`,
  },
  {
    _id: 'iq7',
    bookName: 'Payam-e-Mashriq',
    urduName: 'پیامِ مشرق',
    author: 'علامہ اقبال',
    price: 440,
    bgColor: '#8b4513',
    textColor: '#ffffff',
    urduDesc: `پیامِ مشرق فارسی زبان میں لکھی گئی ہے۔\nیہ 1923 میں شائع ہوئی تھی۔\nگوئٹے کی کتاب کے جواب میں لکھی گئی۔\nاس میں مشرقی فلسفے کا پیغام ہے۔\nمغرب کو مشرق کی روحانیت دکھائی گئی ہے۔\nاقبال نے مشرق و مغرب کا موازنہ کیا ہے۔\nاس میں لطیف اور گہرے اشعار موجود ہیں۔\nرباعیات اس کتاب کا خاص حصہ ہیں۔\nاس میں انسانی اقدار کو اجاگر کیا گیا ہے۔\nیہ مشرقی ادب کا ایک شاہکار ہے۔`,
  },
  {
    _id: 'iq8',
    bookName: 'Javid Nama',
    urduName: 'جاوید نامہ',
    author: 'علامہ اقبال',
    price: 520,
    bgColor: '#00008b',
    textColor: '#ffd700',
    urduDesc: `جاوید نامہ اقبال کا سب سے بڑا فارسی شعری شاہکار ہے۔\nیہ 1932 میں شائع ہوئی تھی۔\nاس میں اقبال نے آسمانی سفر کی تصویر کشی کی ہے۔\nرومی ان کے رہنما کے طور پر موجود ہیں۔\nیہ دانتے کی ڈیوائن کامیڈی سے متاثر ہے۔\nاس میں مختلف ارواح سے ملاقات ہے۔\nجمال الدین افغانی بھی اس میں موجود ہیں۔\nاقبال نے اپنے بیٹے جاوید کو یہ کتاب لکھی۔\nاس میں زندگی اور موت کا فلسفہ ہے۔\nیہ فارسی ادب کا ایک لافانی شاہکار ہے۔`,
  },
  {
    _id: 'iq9',
    bookName: 'Pas Cheh Bayad Kard',
    urduName: 'پس چہ باید کرد',
    author: 'علامہ اقبال',
    price: 430,
    bgColor: '#2f4f4f',
    textColor: '#ffffff',
    urduDesc: `پس چہ باید کرد کا مطلب ہے اب کیا کرنا چاہیے۔\nیہ 1936 میں شائع ہوئی تھی۔\nاس میں مسلمانوں کے لیے راہِ عمل بتائی گئی ہے۔\nاقبال نے مسلم دنیا کے زوال کا تجزیہ کیا ہے۔\nمغربی تعلیم کے نقصانات بیان کیے گئے ہیں۔\nاسلامی تعلیمات کی طرف واپسی کا پیغام ہے۔\nمسلم نوجوانوں کو للکارا گیا ہے۔\nاس میں سیاسی اور سماجی فکر موجود ہے۔\nخودداری اور خوداعتمادی کا درس ہے۔\nیہ اقبال کا انقلابی پیغام ہے۔`,
  },
  {
    _id: 'iq10',
    bookName: 'Reconstruction of Religious Thought',
    urduName: 'تشکیلِ جدیدِ الٰہیاتِ اسلامیہ',
    author: 'علامہ اقبال',
    price: 550,
    bgColor: '#3d0000',
    textColor: '#ffd700',
    urduDesc: `یہ اقبال کی واحد انگریزی نثری کتاب ہے۔\nاس میں اسلامی فکر کو جدید انداز میں پیش کیا گیا ہے۔\nیہ 1930 میں شائع ہوئی تھی۔\nسات لیکچرز پر مشتمل یہ کتاب لاجواب ہے۔\nاس میں قرآنی فلسفے کو سائنس سے ملایا گیا ہے۔\nاجتہاد کی اہمیت کو اجاگر کیا گیا ہے۔\nاسلامی قانون کی تجدید کا مطالبہ ہے۔\nیہ کتاب دنیا بھر میں پڑھی جاتی ہے۔\nاقبال کی فکری گہرائی اس میں نظر آتی ہے۔\nیہ اسلامی فلسفے کی بہترین کتاب ہے۔`,
  },
];

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [added, setAdded] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); }
      catch { setCurrentUser({ name: savedUser }); }
    }
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
    fetchBooks()
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books')
      const data = await response.json()
      setBooks(Array.isArray(data) ? data.slice(0, 6) : [])
    } catch (err) {
      console.log('Error fetching books:', err)
    } finally {
      setLoading(false)
    }
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

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ background: 'linear-gradient(135deg, #f4c892 0%, #fefce8 50%, #f5f7ee 100%)', padding: '160px 0 80px' }}>
        <div className="container text-center">
          <span className="badge mb-3 px-4 py-2"
            style={{ background: '#ffedd5', color: '#f97316', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '600', borderRadius: '50px' }}>
            YOUR PERSONAL BOOK MARKETPLACE
          </span>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Discover, Buy & Sell
            <br />
            <span style={{ color: '#f97316' }}>Books You Love</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.15rem', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
            {currentUser
              ? `Welcome back, ${currentUser.name}! Ready to explore new books today?`
              : 'Join thousands of book lovers buying and selling their favorite reads.'}
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/books" className="btn btn-lg px-5 py-3"
              style={{ background: '#f97311', color: '#ffffff', fontWeight: '700', borderRadius: '50px', border: 'none', boxShadow: '0 4px 15px rgba(249,115,22,0.35)' }}>
              Browse Books →
            </Link>
            {!currentUser && (
              <Link to="/signup" className="btn btn-lg px-5 py-3"
                style={{ background: '#ffffff', color: '#f97316', border: '2px solid #f97316', borderRadius: '50px', fontWeight: '600' }}>
                Join Free
              </Link>
            )}
          </div>
        </div>
      </section>

     

      {/* ===== ALLAMA IQBAL FEATURED BOOKS ===== */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontSize: '2.2rem', marginTop: '8px' }}>
                <span style={{ color: '#f97316' }}>Featured Collection</span>
            </h2>
            <p style={{ fontFamily: 'Noto Nastaliq Urdu, serif', color: '#6b7280', fontSize: '1.1rem', direction: 'rtl' }}>
              پاکستان کے قومی شاعر کی لازوال تصانیف
            </p>
          </div>

          <div className="row g-4">
            {iqbalBooks.map((book) => (
              <div className="col-12 col-md-6 col-lg-4" key={book._id}>
                <div className="card h-100 border-0 shadow-sm"
                  style={{ borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid #fed7aa' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(249,115,22,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>

                  {/* Book Cover */}
                  <div style={{ height: '200px', background: book.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px', border: `2px solid ${book.textColor}`, opacity: 0.3, borderRadius: '8px' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', bottom: '16px', border: `1px solid ${book.textColor}`, opacity: 0.2, borderRadius: '4px' }} />
                    <div className="text-center px-3">
                      <div style={{ fontFamily: 'Noto Nastaliq Urdu, Georgia, serif', color: book.textColor, fontSize: '1.6rem', fontWeight: '700', direction: 'rtl', lineHeight: '1.8', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        {book.urduName}
                      </div>
                      <div style={{ color: book.textColor, fontSize: '0.75rem', opacity: 0.8, marginTop: '6px', letterSpacing: '1px' }}>
                        {book.bookName}
                      </div>
                    </div>
                  </div>

                  <div className="card-body p-4">
                    <div style={{ direction: 'rtl', marginBottom: '8px' }}>
                      <h5 style={{ fontFamily: 'Noto Nastaliq Urdu, Georgia, serif', color: '#111827', fontWeight: '700', marginBottom: '2px', fontSize: '1.1rem' }}>
                        {book.urduName}
                      </h5>
                      <p style={{ color: '#f97316', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0', fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                        {book.author}
                      </p>
                    </div>
                    <div style={{ direction: 'rtl', marginTop: '10px' }}>
                      {book.urduDesc.split('\n').slice(0, 3).map((line, i) => (
                        <p key={i} style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: '1.8', marginBottom: '2px', fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="card-footer bg-white border-0 px-4 pb-4 d-flex justify-content-between align-items-center">
                    <span style={{ color: '#111827', fontWeight: '800', fontSize: '1.1rem' }}>Rs {book.price}</span>
                    <button onClick={() => addToCart(book)}
                      style={{ background: added === book._id ? '#d1fae5' : '#090909', color: added === book._id ? '#059669' : '#f2f0ee', border: `1px solid ${added === book._id ? '#6ee7b7' : '#070706'}`, borderRadius: '50px', padding: '6px 16px', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.3s' }}>
                      {added === book._id ? '✅ Added' : '🛒 Add ToCart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/books" className="btn btn-lg px-5 py-3"
              style={{ background: '#fff7ed', color: '#f97316', border: '2px solid #f97316', borderRadius: '50px', fontWeight: '700' }}>
              Browse All Books →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MARKETPLACE BOOKS ===== */}
      <section style={{ padding: '80px 0', background: '#fff7ed' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ color: '#f97316', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>
              From Our Community
            </span>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontSize: '2.2rem', marginTop: '8px' }}>
              Latest <span style={{ color: '#f97316' }}>Listings</span>
            </h2>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: '#f97316' }} role="status"></div>
              <p style={{ color: '#6b7280', marginTop: '12px' }}>Loading books...</p>
            </div>
          )}

          {!loading && books.length === 0 && (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</div>
              <h5 style={{ color: '#111827', marginBottom: '8px' }}>No books yet!</h5>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>Be the first to list a book for sale.</p>
              <Link to="/books" className="btn px-5 py-2"
                style={{ background: '#f97316', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '700' }}>
                Add a Book
              </Link>
            </div>
          )}

          {!loading && books.length > 0 && (
            <>
              <div className="row g-4">
                {books.map((book, index) => {
                  const emojis = ['📘', '📗', '📕', '📙', '📒', '📔']
                  return (
                    <div className="col-12 col-md-6 col-lg-4" key={book._id}>
                      <div className="card h-100 border-0 shadow-sm"
                        style={{ borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid #fed7aa', background: '#ffffff' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(249,115,22,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                        <div className="d-flex align-items-center justify-content-center"
                          style={{ background: 'linear-gradient(135deg, #fff7ed, #fef9c3)', height: '180px' }}>
                          <span style={{ fontSize: '5rem' }}>{emojis[index % emojis.length]}</span>
                        </div>
                        <div className="card-body p-4">
                          <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontWeight: '700', marginBottom: '4px' }}>{book.bookName}</h5>
                          <p style={{ color: '#f97316', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>by {book.author}</p>
                          {book.user && <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: '0' }}>Seller: {book.user.name}</p>}
                        </div>
                        <div className="card-footer bg-white border-0 px-4 pb-4 d-flex justify-content-between align-items-center">
                          <span style={{ color: '#111827', fontWeight: '800', fontSize: '1.1rem' }}>Rs {book.price}</span>
                          <button onClick={() => addToCart(book)}
                            style={{ background: added === book._id ? '#d1fae5' : '#fff7ed', color: added === book._id ? '#059669' : '#f97316', border: `1px solid ${added === book._id ? '#6ee7b7' : '#fed7aa'}`, borderRadius: '50px', padding: '6px 16px', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.3s' }}>
                            {added === book._id ? '✅ Added' : '🛒 Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="text-center mt-5">
                <Link to="/books" className="btn btn-lg px-5 py-3"
                  style={{ background: '#f97316', color: '#ffffff', border: 'none', borderRadius: '50px', fontWeight: '700' }}>
                  View All Books →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontSize: '2.2rem' }}>
              How It <span style={{ color: '#f97316' }}>Works</span>
            </h2>
          </div>
          <div className="row g-4 text-center">
            {[
              { icon: '📝', title: 'Create Account', desc: 'Sign up for and join our book community' },
              { icon: '📚', title: 'Browse or List', desc: 'Find books or list your own books for sale' },
              { icon: '🤝', title: 'Buy & Sell', desc: 'Transactions safely with our trusted platform' },
            ].map((step, i) => (
              <div className="col-12 col-md-4" key={i}>
                <div style={{ background: 'black', borderRadius: '16px', padding: '40px 30px', boxShadow: '0 2px 15px rgba(249,115,22,0.08)', border: '1px solid #fed7aa' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{step.icon}</div>
                  <h5 style={{ color: '#f97316', fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>{step.title}</h5>
                  <p style={{ color: 'white', marginBottom: '0', lineHeight: '1.7' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* ===== FOOTER ===== */}
      <footer style={{ background: 'black', padding: '60px 0', borderTop: '1px solid #fed7aa' }}>
        <div className="container text-center">
          <p style={{ color: '#9ca3af', marginBottom: '0', fontSize: '0.9rem' }}>
            © 2026 Books Corner — Made with ❤️ for book lovers
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
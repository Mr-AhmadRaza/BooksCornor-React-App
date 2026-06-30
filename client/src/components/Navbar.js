import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const BooksCornerLogo = () => (
  <svg
    viewBox="0 0 200 50"
    width="160"
    height="58"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Books Corner — Your books home"
    style={{ display: "block" }}
  >
    <rect x="2" y="2" width="46" height="46" rx="8" fill="black" />
    <text
      x="25" y="36"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="32"
      fontWeight="700"
      textAnchor="middle"
      fill="#ffffff"
    >
      Bc
    </text>
    <text
      x="56" y="24"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="15"
      fontWeight="700"
      fill="#orange"
    >
      Books-Corner
    </text>
    <line x1="56" y1="30" x2="145" y2="30" stroke="#fed7aa" strokeWidth="1.5" />
    <text
      x="56" y="44"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="11"
      letterSpacing="1"
      fill="#f97316"
    >
      Your books home
    </text>
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name);
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Browse Books', path: '/books' },
    { label: 'About', path: '/about' },
    { label: '🛒 Cart', path: '/cart', badge: cartCount },
    { label: '🧾 Checkout', path: '/checkout' },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{ background: '#ffffff', borderBottom: '3px solid #fed7aa' }}
    >
      <div className="container">

        <Link className="navbar-brand p-0" to="/">
          <BooksCornerLogo />
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-1">
            {navItems.map((item, i) => (
              <li className="nav-item" key={i}>
                <Link
                  className="nav-link px-3 py-2 rounded"
                  to={item.path}
                  style={{ color: '#374151', fontWeight: '500', transition: 'all 0.2s', position: 'relative' }}
                  onMouseEnter={e => { e.target.style.color = '#f97316'; e.target.style.background = '#fff7ed'; }}
                  onMouseLeave={e => { e.target.style.color = '#374151'; e.target.style.background = 'transparent'; }}
                >
                  {item.label}
                  {item.badge > 0 && (
                    <span style={{
                      background: '#f97316',
                      color: '#fff',
                      borderRadius: '50%',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '1px 6px',
                      marginLeft: '6px'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm px-4"
                  style={{ border: '2px solid #f97316', color: '#f97316', background: 'transparent', borderRadius: '50px', fontWeight: '600' }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-sm px-4"
                  style={{ background: '#f97316', color: '#ffffff', borderRadius: '50px', border: 'none', fontWeight: '600', boxShadow: '0 2px 8px rgba(249,115,22,0.3)' }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <span style={{ color: '#f97316', fontWeight: '600', fontSize: '0.9rem' }}>
                  👤 {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm px-4"
                  style={{ background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa', borderRadius: '50px' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
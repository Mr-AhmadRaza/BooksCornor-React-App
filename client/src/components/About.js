import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fefce8 50%, #fff7ed 100%)', padding: '80px 0' }}>
        <div className="container text-center">
         
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.2', marginTop: '16px', marginBottom: '1rem' }}>
            Welcome to <span style={{ color: '#f97316' }}>Books Corner</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
            A community-driven marketplace where book lovers come together to buy, sell, and share their favorite reads.
          </p>
        </div>
     
      {/* ===== TEAM ===== */}
      
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#0e0e0e', fontSize: '2.2rem' }}>
              Behind  <span style={{ color: '#100f0f' }}>Books Corner</span>
            </h2>
            <p style={{ color: '#6b7280', marginTop: '8px' }}></p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { name: 'Ahmad Raza', role: 'Founder & Developer', emoji: '👨‍💻', desc: 'Full Stack Developer passionate about building products that make a difference.' },
              { name: 'Book Lovers', role: 'Our Community', emoji: '📚', desc: 'Thousands of readers who trust Books Corner for buying and selling books.' },
              { name: 'You!', role: 'Our Next Member', emoji: '🌟', desc: 'Join our growing community and start your book journey today.' },
            ].map((member, i) => (
              <div className="col-12 col-md-4" key={i}>
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '40px 30px', textAlign: 'center', border: '1px solid #fed7aa', boxShadow: '0 2px 15px rgba(249,115,22,0.06)' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #fff7ed, #fef9c3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2.5rem', border: '2px solid #fed7aa' }}>
                    {member.emoji}
                  </div>
                  <h5 style={{ fontFamily: 'Georgia, serif', color: '#111827', marginBottom: '4px' }}>{member.name}</h5>
                  <p style={{ color: '#f97316', fontSize: '0.85rem', fontWeight: '600', marginBottom: '12px' }}>{member.role}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '0' }}>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#111827', fontSize: '2.2rem' }}>
              Get In <span style={{ color: '#f97316' }}>Touch</span>
            </h2>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>Have questions? We would love to hear from you!</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { icon: '📧', title: 'Email Us', value: 'iahmad6raza@gmail.com' },
              { icon: '📱', title: 'WhatsApp', value: '+92-308-4354552' },
              { icon: '📍', title: 'Location', value: 'Pakistan' },
            ].map((contact, i) => (
              <div className="col-12 col-md-4" key={i}>
                <div style={{ background: '#fff7ed', borderRadius: '16px', padding: '30px', textAlign: 'center', border: '1px solid #fed7aa' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{contact.icon}</div>
                  <h6 style={{ color: '#111827', fontWeight: '700', marginBottom: '6px' }}>{contact.title}</h6>
                  <p style={{ color: '#f97316', fontWeight: '600', marginBottom: '0' }}>{contact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, #0f0f0f)', padding: '30px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#f8f3f0', fontSize: '2rem', marginBottom: '1rem' }}>
            Ready to Join Books Corner?
          </h2>
          <p style={{ color: '#fff7ed', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Start buying and selling books today — completely free!
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/signup" className="btn btn-lg px-5 py-3"
              style={{ background: '#ffffff', color: '#f97316', fontWeight: '700', borderRadius: '50px', border: 'none' }}>
              Sign Up Free →
            </Link>
            <Link to="/books" className="btn btn-lg px-5 py-3"
              style={{ background: 'transparent', color: '#f97316', fontWeight: '700', borderRadius: '50px', border: '2px solid #ffffff' }}>
              Browse Books
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
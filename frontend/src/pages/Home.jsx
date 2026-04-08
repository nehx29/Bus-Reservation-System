import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (source && destination && date) {
      navigate(`/buses?source=${source}&destination=${destination}&date=${date}`);
    } else {
      navigate('/buses');
    }
  };

  const quickSearch = (s, d) => {
    navigate(`/buses?source=${s}&destination=${d}&date=2026-04-07`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Banner Section */}
      <div style={{ 
        height: '600px',
        width: '100%',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1920") no-repeat center center',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '0 20px',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '800', letterSpacing: '-2px', marginBottom: '15px', textShadow: '2px 4px 8px rgba(0,0,0,0.3)' }}>
          Explore India, <span style={{ color: 'var(--accent)' }}>One Bus</span> at a Time
        </h1>
        <p style={{ fontSize: '1.6rem', opacity: 0.95, fontWeight: '500', maxWidth: '800px', margin: '0 auto 40px auto', textShadow: '1px 2px 4px rgba(0,0,0,0.2)' }}>
          Fast, secure, and premium bus reservations across major Indian cities.
        </p>
      </div>

      {/* Content Section - Now below the banner */}
      <div className="container" style={{ marginTop: '60px', position: 'relative' }}>
        <div className="card glass" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '30px', color: 'var(--secondary)', fontWeight: '700' }}>Plan Your Journey</h2>
          <form onSubmit={handleSearch} className="grid-3" style={{ textAlign: 'left' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Leaving From</label>
              <input type="text" placeholder="Source City" value={source} onChange={e => setSource(e.target.value)} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Going To</label>
              <input type="text" placeholder="Destination City" value={destination} onChange={e => setDestination(e.target.value)} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Travel Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div style={{ gridColumn: '1 / -1', marginTop: '30px', display: 'flex', gap: '20px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 2, fontSize: '1.2rem', padding: '18px' }}>
                🚀 Search Available Buses
              </button>
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate('/buses')}>
                🌐 View All Routes
              </button>
            </div>
          </form>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-light)', fontWeight: '700', fontSize: '0.9rem' }}>POPULAR ROUTES:</span>
            <button className="badge badge-success" style={{ border: 'none', cursor: 'pointer', padding: '8px 16px' }} onClick={() => quickSearch('Chennai', 'Coimbatore')}>Chennai → Coimbatore</button>
            <button className="badge badge-success" style={{ border: 'none', cursor: 'pointer', padding: '8px 16px' }} onClick={() => quickSearch('Bangalore', 'Chennai')}>Bangalore → Chennai</button>
            <button className="badge badge-success" style={{ border: 'none', cursor: 'pointer', padding: '8px 16px' }} onClick={() => quickSearch('Coimbatore', 'Trichy')}>Coimbatore → Trichy</button>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-around', textAlign: 'center', paddingBottom: '80px' }}>
          <div>
            <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: 'var(--shadow)' }}>
              <span style={{ fontSize: '2.5rem' }}>🎫</span>
            </div>
            <h3 style={{ marginTop: '10px' }}>Easy Booking</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '200px' }}>Book your tickets in under 60 seconds.</p>
          </div>
          <div>
            <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: 'var(--shadow)' }}>
              <span style={{ fontSize: '2.5rem' }}>🛡️</span>
            </div>
            <h3 style={{ marginTop: '10px' }}>Secure Payments</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '200px' }}>100% encrypted payment gateways.</p>
          </div>
          <div>
            <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: 'var(--shadow)' }}>
              <span style={{ fontSize: '2.5rem' }}>⭐</span>
            </div>
            <h3 style={{ marginTop: '10px' }}>Top Rated</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '200px' }}>4.8/5 rating from over 1M users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const { data } = await api.get(`/buses/search?` + query.toString());
        setBuses(data);
        
        // If specific search is empty, fetch all as fallback for "some buses" visibility
        if (data.length === 0 && query.toString() !== '') {
          const allData = await api.get('/buses/search');
          setBuses(allData.data.slice(0, 6)); // Show top 6 available buses as recommendations
          setHasFiltered(true);
        } else {
          setHasFiltered(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, [location.search]);

  const [hasFiltered, setHasFiltered] = useState(false);

  if (loading) return (
    <div className="container mt-2 text-center">
      <div className="card glass">
        <h2 className="animate-pulse">Searching for live bus availability...</h2>
      </div>
    </div>
  );

  return (
    <div className="container mt-2">
      <div className="flex-between" style={{ marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800' }}>
            {hasFiltered ? 'Recommended Buses' : 'Available Buses'}
          </h2>
          {hasFiltered && <p style={{ color: 'var(--text-light)' }}>No exact matches found. Showing other available routes for you.</p>}
        </div>
        <button onClick={() => navigate('/')} className="btn btn-outline">Modify Search</button>
      </div>

      {buses.length === 0 ? (
        <div className="card text-center glass" style={{ padding: '80px' }}>
          <span style={{ fontSize: '4rem' }}>🚌</span>
          <p style={{ marginTop: '20px', fontSize: '1.4rem', color: 'var(--text-light)', fontWeight: '600' }}>
            All buses are currently booked or unavailable.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-2">Check Later</button>
        </div>
      ) : (
        <div className="grid-3">
          {buses.map(bus => (
            <div key={bus._id} className="card glass">
              <div className="flex-between" style={{ marginBottom: '15px' }}>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: '800' }}>{bus.busName}</h3>
                <span className={`badge ${bus.busType === 'Sleeper' ? 'badge-success' : bus.busType === 'AC' ? 'badge-primary' : 'badge-secondary'}`} style={{ 
                  backgroundColor: bus.busType === 'Sleeper' ? '#C6F6D5' : bus.busType === 'AC' ? '#BEE3F8' : '#E2E8F0',
                  color: bus.busType === 'Sleeper' ? '#22543D' : bus.busType === 'AC' ? '#2A4365' : '#4A5568'
                }}>
                  {bus.busType || 'Normal'}
                </span>
              </div>
              <div style={{ padding: '15px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
                <p><strong>🚌 Bus No:</strong> <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{bus.busNumber}</span></p>
                <p><strong>📍 Route:</strong> {bus.source} → {bus.destination}</p>
              </div>
              <div className="flex-between">
                <p style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--secondary)' }}>₹{bus.pricePerSeat}</p>
                <button 
                  onClick={() => navigate(`/book/${bus._id}`)} 
                  className="btn btn-primary"
                >
                  View Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusList;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="container mt-2">
      <div className="card mb-2" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#fff' }}>
        <h1 style={{ marginBottom: '10px' }}>Welcome, {user?.name || 'User'}!</h1>
        <p>Email: {user?.email}</p>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Your Bookings ({bookings.length})</h2>
      
      {bookings.length === 0 ? (
        <div className="card text-center">
          <p>You have no bookings yet.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-2">Book a Ticket</button>
        </div>
      ) : (
        <div className="grid-2">
          {bookings.map((b) => (
            <div key={b._id} className="card" style={{ borderLeft: `5px solid ${b.bookingStatus === 'Confirmed' ? 'var(--success)' : 'var(--danger)'}` }}>
              <h3>Booking ID: {b._id.slice(-6).toUpperCase()}</h3>
              <div style={{ marginTop: '10px', color: 'var(--text-light)' }}>
                <p><strong>Route:</strong> {b.busId.source} to {b.busId.destination}</p>
                <p><strong>Date:</strong> {new Date(b.journeyDate).toLocaleDateString()}</p>
                <p><strong>Seats:</strong> {b.seatsBooked.join(', ')}</p>
                <p><strong>Total Paid:</strong> ₹{b.totalAmount}</p>
                <p style={{ marginTop: '10px', fontWeight: 'bold', color: b.bookingStatus === 'Confirmed' ? 'var(--success)' : 'var(--danger)' }}>
                  Status: {b.bookingStatus}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

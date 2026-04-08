import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PaymentModal from '../components/PaymentModal';

function SeatSelection() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const { data } = await api.get(`/buses/${busId}`);
        setBus(data);
      } catch (err) {
        console.error('Error fetching bus', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBus();
  }, [busId]);

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;
    
    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const handleBookingConfirm = () => {
    if (!localStorage.getItem('token')) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const payload = {
        busId,
        seatsBooked: selectedSeats,
        totalAmount: selectedSeats.length * bus.pricePerSeat,
        journeyDate: bus.departureTime
      };
      
      await api.post('/bookings', payload);
      alert('Payment Successful! Ticket Booked.');
      navigate('/dashboard');
    } catch (err) {
      alert('Error booking tickets. Please try again.');
    } finally {
      setIsPaymentModalOpen(false);
    }
  };

  if (loading) return <div className="text-center mt-2">Loading seating layout...</div>;
  if (!bus) return <div className="text-center mt-2">Bus not found!</div>;

  return (
    <div className="container mt-2">
      <div className="grid-2">
        <div className="card glass">
          <h2 style={{ marginBottom: '20px' }}>Select Your Seats</h2>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="seat" style={{ width: '20px', height: '20px', cursor: 'default' }}></div>
              <span style={{ fontSize: '0.9rem' }}>Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="seat selected" style={{ width: '20px', height: '20px', cursor: 'default' }}></div>
              <span style={{ fontSize: '0.9rem' }}>Selected</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="seat booked" style={{ width: '20px', height: '20px', cursor: 'default' }}></div>
              <span style={{ fontSize: '0.9rem' }}>Booked</span>
            </div>
          </div>

          <div className="seat-map">
            {bus.seats.map((seat) => (
              <div
                key={seat._id}
                className={`seat ${seat.isBooked ? 'booked' : selectedSeats.includes(seat.seatNumber) ? 'selected' : ''}`}
                onClick={() => toggleSeat(seat)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card glass">
            <h2 style={{ marginBottom: '20px' }}>Booking Summary</h2>
            <div style={{ padding: '20px 0', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>{bus.busName}</p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{bus.busNumber}</p>
              
              <div style={{ marginTop: '20px' }}>
                <p><strong>Route:</strong> {bus.source} to {bus.destination}</p>
                <p><strong>Time:</strong> {new Date(bus.departureTime).toLocaleString()}</p>
              </div>
              
              <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--border)' }}/>
              
              <div className="flex-between">
                <span>Selected Seats:</span>
                <span style={{ fontWeight: '700' }}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
              </div>
              
              <div className="flex-between mt-2">
                <span style={{ fontSize: '1.2rem' }}>Total Amount:</span>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--success)' }}>
                  ₹{selectedSeats.length * bus.pricePerSeat}
                </span>
              </div>
              
              <button 
                className="btn btn-primary mt-2" 
                style={{ width: '100%', padding: '18px' }}
                disabled={selectedSeats.length === 0}
                onClick={handleBookingConfirm}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        amount={selectedSeats.length * bus.pricePerSeat}
      />
    </div>
  );
}

export default SeatSelection;

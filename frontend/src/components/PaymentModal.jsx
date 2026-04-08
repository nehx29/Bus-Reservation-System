import React, { useState } from 'react';

function PaymentModal({ isOpen, onClose, onPaymentSuccess, amount }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Secure Payment</h2>
        <p style={{ marginBottom: '30px', color: 'var(--text-light)' }}>
          Total Amount to Pay: <span style={{ color: 'var(--text-main)', fontWeight: '800', fontSize: '1.5rem' }}>₹{amount}</span>
        </p>

        <div className="input-group">
          <label>Select Payment Method</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn ${paymentMethod === 'card' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '10px' }}
              onClick={() => setPaymentMethod('card')}
            >
              💳 Card
            </button>
            <button 
              className={`btn ${paymentMethod === 'upi' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '10px' }}
              onClick={() => setPaymentMethod('upi')}
            >
              📱 UPI
            </button>
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <div style={{ animation: 'modalIn 0.3s' }}>
            <div className="input-group">
              <label>Card Number</label>
              <input type="text" placeholder="XXXX XXXX XXXX XXXX" defaultValue="4242 4242 4242 4242" />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Expiry</label>
                <input type="text" placeholder="MM/YY" defaultValue="12/26" />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>CVV</label>
                <input type="password" placeholder="***" defaultValue="123" />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ animation: 'modalIn 0.3s', textAlign: 'center', padding: '20px' }}>
            <p>Scan QR or enter UPI ID</p>
            <div className="input-group mt-2">
              <input type="text" placeholder="username@upi" defaultValue="user@okaxis" />
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose} disabled={isProcessing}>
            Cancel
          </button>
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
          </button>
        </div>

        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-light)', textAlign: 'center' }}>
          🔒 Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}

export default PaymentModal;

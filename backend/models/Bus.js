const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  busNumber: { type: String, required: true, unique: true },
  busType: { type: String, default: 'Normal' }, // Normal, AC, Sleeper
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  pricePerSeat: { type: Number, required: true },
  // 40 seats by default
  seats: [{
    seatNumber: { type: String, required: true },
    isBooked: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);

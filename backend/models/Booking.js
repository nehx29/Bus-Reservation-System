const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  seatsBooked: [{
    type: String,
    required: true,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed',
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

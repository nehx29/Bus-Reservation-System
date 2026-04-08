const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const auth = require('../middleware/authMiddleware');

// POST /api/bookings
router.post('/', auth, async (req, res) => {
  try {
    const { busId, seatsBooked, totalAmount, journeyDate } = req.body;

    // Optional: Add logic to check if seats are already booked for that date on that bus
    const newBooking = new Booking({
      userId: req.user.id,
      busId,
      seatsBooked,
      totalAmount,
      journeyDate
    });

    const booking = await newBooking.save();

    // Mark seats as booked on the bus model
    const bus = await Bus.findById(busId);
    if (bus) {
      bus.seats.forEach(seat => {
        if (seatsBooked.includes(seat.seatNumber)) {
          seat.isBooked = true;
        }
      });
      await bus.save();
    }

    res.json(booking);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/bookings/my-bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('busId', ['busName', 'busNumber', 'source', 'destination', 'departureTime']);
    res.json(bookings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// GET /api/buses/search
router.get('/search', async (req, res) => {
  const { source, destination, date } = req.query;
  try {
    let query = {};
    if (source) query.source = new RegExp(source, 'i');
    if (destination) query.destination = new RegExp(destination, 'i');
    
    if (date) {
      const searchDate = new Date(date);
      const nextDate = new Date(date);
      nextDate.setDate(searchDate.getDate() + 1);
      
      query.departureTime = {
        $gte: searchDate,
        $lt: nextDate
      };
    }

    const buses = await Bus.find(query);
    res.json(buses);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/buses/:id
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST /api/buses (Admin only typically, but open for seeding)
router.post('/', async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    const bus = await newBus.save();
    res.json(bus);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

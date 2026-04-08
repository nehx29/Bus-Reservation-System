const mongoose = require('mongoose');
require('dotenv').config();
const Bus = require('./models/Bus');

const seedBuses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing buses
    await Bus.deleteMany({});
    console.log('Cleared existing buses');

    const seats = Array.from({ length: 40 }, (_, i) => ({
      seatNumber: `${Math.floor(i / 4) + 1}${['A', 'B', 'C', 'D'][i % 4]}`,
      isBooked: false
    }));

    const sampleBuses = [
      {
        busName: 'Priya Travels',
        busNumber: 'TN-01-AB-1234',
        busType: 'Normal',
        source: 'Chennai',
        destination: 'Coimbatore',
        departureTime: new Date('2026-04-07T21:00:00'),
        pricePerSeat: 650,
        seats: seats
      },
      {
        busName: 'KN Travels',
        busNumber: 'TN-37-XY-5678',
        busType: 'Normal',
        source: 'Coimbatore',
        destination: 'Bangalore',
        departureTime: new Date('2026-04-07T22:30:00'),
        pricePerSeat: 700,
        seats: seats
      },
      {
        busName: 'SRS Travels',
        busNumber: 'KA-05-MN-9012',
        busType: 'Normal',
        source: 'Bangalore',
        destination: 'Chennai',
        departureTime: new Date('2026-04-07T23:00:00'),
        pricePerSeat: 550,
        seats: seats
      },
      {
        busName: 'Orange Travels',
        busNumber: 'AP-16-TG-4455',
        busType: 'Normal',
        source: 'Coimbatore',
        destination: 'Trichy',
        departureTime: new Date('2026-04-10T06:00:00'),
        pricePerSeat: 450,
        seats: seats
      },
      {
        busName: 'Manju Travels',
        busNumber: 'TN-45-RT-8899',
        busType: 'Normal',
        source: 'Coimbatore',
        destination: 'Thanjavur',
        departureTime: new Date('2026-04-10T21:00:00'),
        pricePerSeat: 500,
        seats: seats
      },
      {
        busName: 'Hash Travels',
        busNumber: 'TN-07-CD-5573',
        busType: 'Sleeper',
        source: 'Chennai',
        destination: 'Dharmapuri',
        departureTime: new Date('2026-04-08T22:00:00'),
        pricePerSeat: 1450,
        seats: seats
      },
      {
        busName: 'Sri Transports',
        busNumber: 'KA-02-PQ-1234',
        busType: 'Sleeper',
        source: 'Bangalore',
        destination: 'Coimbatore',
        departureTime: new Date('2026-04-08T23:30:00'),
        pricePerSeat: 1300,
        seats: seats
      },
      {
        busName: 'National Travels',
        busNumber: 'KA-09-JK-8822',
        busType: 'Sleeper',
        source: 'Bangalore',
        destination: 'Madurai',
        departureTime: new Date('2026-04-09T20:45:00'),
        pricePerSeat: 1550,
        seats: seats
      },
      {
        busName: 'Sharma Travels',
        busNumber: 'TN-14-LM-9900',
        busType: 'Sleeper',
        source: 'Chennai',
        destination: 'Salem',
        departureTime: new Date('2026-04-09T22:15:00'),
        pricePerSeat: 1250,
        seats: seats
      }
    ];

    await Bus.insertMany(sampleBuses);
    console.log('Successfully seeded buses');
    process.exit();
  } catch (err) {
    console.error('Error seeding buses:', err);
    process.exit(1);
  }
};

seedBuses();

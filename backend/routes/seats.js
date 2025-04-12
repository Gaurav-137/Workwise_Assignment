// File: backend/routes/seats.js

const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController'); // real controller

// Routes
router.get('/', seatController.getAllSeats);
router.post('/book', seatController.bookSeats);
router.post('/reset', seatController.resetSeats);

module.exports = router;

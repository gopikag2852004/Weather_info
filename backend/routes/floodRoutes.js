const express = require('express');
const router = express.Router();
const { getAllFloodZones, getFloodZonesByDistrict } = require('../controllers/floodController');

// GET /api/floods
router.get('/', getAllFloodZones);

// GET /api/floods/district/:district
router.get('/district/:district', getFloodZonesByDistrict);

module.exports = router;
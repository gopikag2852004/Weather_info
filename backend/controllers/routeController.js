const axios = require('axios');
const db = require('../config/db');
const { calculateTotalTravelTime } = require('../utils/delayCalculator');
const { calculateSafetyScore } = require('../utils/safetyScore');

// Kerala city coordinates
const keralaCities = {
  'kochi': { lat: 9.9312, lon: 76.2673 },
  'thrissur': { lat: 10.5276, lon: 76.2144 },
  'kozhikode': { lat: 11.2543, lon: 75.7809 },
  'thiruvananthapuram': { lat: 8.5241, lon: 76.9366 },
  'kannur': { lat: 11.8745, lon: 75.3704 },
  'alappuzha': { lat: 9.4981, lon: 76.3388 },
  'palakkad': { lat: 10.7867, lon: 76.6548 },
  'wayanad': { lat: 11.6085, lon: 76.0834 },
  'malappuram': { lat: 11.0510, lon: 76.0711 },
  'kollam': { lat: 8.8932, lon: 76.6141 },
  'pathanamthitta': { lat: 9.2648, lon: 76.7870 },
  'idukki': { lat: 9.9189, lon: 77.1025 },
  'kottayam': { lat: 9.5916, lon: 76.5222 },
  'kasaragod': { lat: 12.4996, lon: 74.9869 },
};

const getRoute = async (req, res) => {
  try {
    const { source, destination, rainfall } = req.body;

    const srcKey = source.toLowerCase().trim();
    const destKey = destination.toLowerCase().trim();

    const srcCoords = keralaCities[srcKey];
    const destCoords = keralaCities[destKey];

    if (!srcCoords || !destCoords) {
      return res.status(400).json({ error: 'City not found. Please enter valid Kerala cities.' });
    }

    // Get route from OSRM (free, no API key needed)
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${srcCoords.lon},${srcCoords.lat};${destCoords.lon},${destCoords.lat}?overview=full&geometries=geojson`;

    const osrmResponse = await axios.get(osrmUrl);
    const route = osrmResponse.data.routes[0];

    const distanceKm = (route.distance / 1000).toFixed(1);
    const baseDurationMinutes = Math.round(route.duration / 60);

    // Check flood zones near route
    const [floodZones] = await db.query('SELECT * FROM flood_zones WHERE risk_level IN ("high", "medium")');

    // Simple check: count flood zones in same districts as source/destination
    const rainfallAmount = parseFloat(rainfall) || 5.0;
    const affectedZones = floodZones.filter(zone =>
      zone.district.toLowerCase().includes(srcKey) ||
      zone.district.toLowerCase().includes(destKey)
    );

    const travelTime = calculateTotalTravelTime(baseDurationMinutes, rainfallAmount);
    const safety = calculateSafetyScore(rainfallAmount, affectedZones.length, baseDurationMinutes);

    res.json({
      source: source,
      destination: destination,
      distanceKm,
      travelTime,
      safety,
      floodWarnings: affectedZones,
      geometry: route.geometry,
      coordinates: {
        source: srcCoords,
        destination: destCoords
      }
    });

  } catch (error) {
    console.error('Route fetch error:', error.message);
    res.status(500).json({ error: 'Failed to calculate route' });
  }
};

module.exports = { getRoute };
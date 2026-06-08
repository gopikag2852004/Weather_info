const db = require('../config/db');

const getAllFloodZones = (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM flood_zones').all();
    res.json(rows);
  } catch (error) {
    console.error('Flood zones fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch flood zones' });
  }
};

const getFloodZonesByDistrict = (req, res) => {
  try {
    const { district } = req.params;
    const rows = db.prepare('SELECT * FROM flood_zones WHERE district = ?').all(district);
    res.json(rows);
  } catch (error) {
    console.error('Flood zones fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch flood zones for district' });
  }
};

module.exports = { getAllFloodZones, getFloodZonesByDistrict };
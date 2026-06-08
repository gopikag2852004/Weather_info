const db = require('../config/db');

const FloodZone = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM flood_zones');
    return rows;
  },

  getByDistrict: async (district) => {
    const [rows] = await db.query(
      'SELECT * FROM flood_zones WHERE district = ?',
      [district]
    );
    return rows;
  },

  getHighRisk: async () => {
    const [rows] = await db.query(
      'SELECT * FROM flood_zones WHERE risk_level = "high"'
    );
    return rows;
  },

  create: async (data) => {
    const { name, district, latitude, longitude, risk_level, description } = data;
    const [result] = await db.query(
      'INSERT INTO flood_zones (name, district, latitude, longitude, risk_level, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, district, latitude, longitude, risk_level, description]
    );
    return result;
  }
};

module.exports = FloodZone;
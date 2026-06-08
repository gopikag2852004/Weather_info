const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../database/mazhapath.db'));

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS flood_zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    risk_level TEXT DEFAULT 'medium',
    description TEXT
  );
`);

// Seed data if table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM flood_zones').get();
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO flood_zones (name, district, latitude, longitude, risk_level, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const zones = [
    ['Aluva Low Bridge', 'Ernakulam', 10.1004, 76.3570, 'high', 'Floods during heavy monsoon, road submerges'],
    ['Thrissur Ollur Road', 'Thrissur', 10.5276, 76.2144, 'medium', 'Waterlogging during moderate rain'],
    ['Kochi Edappally Junction', 'Ernakulam', 10.0261, 76.3083, 'high', 'Severe waterlogging, traffic halts'],
    ['Kozhikode Palayam', 'Kozhikode', 11.2543, 75.7809, 'medium', 'Moderate flood risk near canal'],
    ['Alappuzha Town Center', 'Alappuzha', 9.4981, 76.3388, 'high', 'Prone to severe flooding, low elevation'],
    ['Wayanad Kalpetta Road', 'Wayanad', 11.6085, 76.0834, 'high', 'Landslide and flood risk during monsoon'],
    ['Kannur Thavakkara', 'Kannur', 11.8745, 75.3704, 'medium', 'Waterlogging near paddy fields'],
    ['Malappuram Tirur', 'Malappuram', 10.9149, 75.9220, 'medium', 'Flood risk near river banks'],
  ];

  zones.forEach(zone => insert.run(...zone));
  console.log('✅ Flood zones seeded!');
}

console.log('✅ SQLite connected successfully!');

module.exports = db;
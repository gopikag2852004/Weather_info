CREATE DATABASE IF NOT EXISTS mazhapath;
USE mazhapath;

CREATE TABLE IF NOT EXISTS flood_zones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  district VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  risk_level ENUM('low', 'medium', 'high') DEFAULT 'medium',
  description TEXT
);

INSERT INTO flood_zones (name, district, latitude, longitude, risk_level, description) VALUES
('Aluva Low Bridge', 'Ernakulam', 10.1004, 76.3570, 'high', 'Floods during heavy monsoon, road submerges'),
('Thrissur Ollur Road', 'Thrissur', 10.5276, 76.2144, 'medium', 'Waterlogging during moderate rain'),
('Kochi Edappally Junction', 'Ernakulam', 10.0261, 76.3083, 'high', 'Severe waterlogging, traffic halts'),
('Kozhikode Palayam', 'Kozhikode', 11.2543, 75.7809, 'medium', 'Moderate flood risk near canal'),
('Alappuzha Town Center', 'Alappuzha', 9.4981, 76.3388, 'high', 'Prone to severe flooding, low elevation'),
('Wayanad Kalpetta Road', 'Wayanad', 11.6085, 76.0834, 'high', 'Landslide and flood risk during monsoon'),
('Kannur Thavakkara', 'Kannur', 11.8745, 75.3704, 'medium', 'Waterlogging near paddy fields'),
('Malappuram Tirur', 'Malappuram', 10.9149, 75.9220, 'medium', 'Flood risk near river banks');
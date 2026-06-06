const axios = require('axios');
const { calculateDelay } = require('../utils/delayCalculator');

// Mock weather data for Kerala cities (used when no API key)
const mockWeatherData = {
  'kochi': { city: 'Kochi', rainfall: 12.5, humidity: 89, temp: 27, condition: 'Heavy Rain', icon: '🌧️' },
  'thrissur': { city: 'Thrissur', rainfall: 7.5, humidity: 85, temp: 26, condition: 'Moderate Rain', icon: '🌦️' },
  'kozhikode': { city: 'Kozhikode', rainfall: 15.0, humidity: 92, temp: 25, condition: 'Heavy Rain', icon: '🌧️' },
  'thiruvananthapuram': { city: 'Thiruvananthapuram', rainfall: 2.5, humidity: 78, temp: 29, condition: 'Light Rain', icon: '🌂' },
  'kannur': { city: 'Kannur', rainfall: 10.0, humidity: 88, temp: 26, condition: 'Heavy Rain', icon: '🌧️' },
  'alappuzha': { city: 'Alappuzha', rainfall: 18.0, humidity: 94, temp: 25, condition: 'Extreme Rain', icon: '⛈️' },
  'palakkad': { city: 'Palakkad', rainfall: 0, humidity: 65, temp: 33, condition: 'Clear', icon: '☀️' },
  'wayanad': { city: 'Wayanad', rainfall: 20.0, humidity: 96, temp: 22, condition: 'Extreme Rain', icon: '⛈️' },
  'malappuram': { city: 'Malappuram', rainfall: 5.0, humidity: 82, temp: 27, condition: 'Moderate Rain', icon: '🌦️' },
  'kollam': { city: 'Kollam', rainfall: 3.0, humidity: 80, temp: 28, condition: 'Light Rain', icon: '🌂' },
};

const getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const cityKey = city.toLowerCase().trim();

    const weatherData = mockWeatherData[cityKey];

    if (!weatherData) {
      // Return default mock if city not found
      return res.json({
        city: city,
        rainfall: 5.0,
        humidity: 80,
        temp: 27,
        condition: 'Moderate Rain',
        icon: '🌦️',
        delay: calculateDelay(5.0)
      });
    }

    const delay = calculateDelay(weatherData.rainfall);

    res.json({ ...weatherData, delay });

  } catch (error) {
    console.error('Weather fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeather };
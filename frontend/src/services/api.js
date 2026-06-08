import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getWeather = async (city) => {
  const response = await axios.get(`${API_BASE}/weather/${city}`);
  return response.data;
};

export const getRoute = async (source, destination, rainfall) => {
  const response = await axios.post(`${API_BASE}/routes`, {
    source,
    destination,
    rainfall
  });
  return response.data;
};

export const getFloodZones = async () => {
  const response = await axios.get(`${API_BASE}/floods`);
  return response.data;
};
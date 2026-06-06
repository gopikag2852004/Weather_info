const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const routeRoutes = require('./routes/routeRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const floodRoutes = require('./routes/floodRoutes');

app.use('/api/routes', routeRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/floods', floodRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🌧️ MazhaPath API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌧️ MazhaPath server running on port ${PORT}`);
});
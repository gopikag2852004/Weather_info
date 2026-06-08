import { useState } from 'react';
import RouteForm from './components/RouteForm';
import WeatherCard from './components/WeatherCard';
import DelayBadge from './components/DelayBadge';
import SafetyScoreCard from './components/SafetyScoreCard';
import FloodWarning from './components/FloodWarning';
import MapView from './components/MapView';
import { getRoute, getWeather } from './services/api';
import './index.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (source, destination) => {
    setLoading(true);
    setError(null);
    setRouteData(null);
    setWeatherData(null);

    try {
      const [route, weather] = await Promise.all([
        getRoute(source, destination, 10),
        getWeather(source)
      ]);
      setRouteData(route);
      setWeatherData(weather);
    } catch (err) {
      setError('Something went wrong. Please try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2C6FAC, #4A90D9)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 4px 20px rgba(44,111,172,0.3)'
      }}>
        <span style={{ fontSize: '2rem' }}>🌧️</span>
        <div>
          <h1 style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem' }}>MazhaPath</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 600 }}>
            Kerala Monsoon Route Predictor
          </p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            borderRadius: '20px',
            padding: '0.3rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            🟢 Live
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? '380px 1fr' : '1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>

        {/* Left Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <RouteForm onSearch={handleSearch} loading={loading} />

          {error && (
            <div className="card" style={{ background: '#FFE5E5', borderColor: '#FF6B6B' }}>
              <p style={{ fontWeight: 700, color: '#C62828', textAlign: 'center' }}>
                ❌ {error}
              </p>
            </div>
          )}

          {loading && (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌧️</div>
              <p style={{ fontWeight: 700, color: '#4A90D9' }}>
                Calculating your route...
              </p>
            </div>
          )}

          {weatherData && <WeatherCard weather={weatherData} />}
          {routeData && <DelayBadge travelTime={routeData.travelTime} />}
          {routeData && <SafetyScoreCard safety={routeData.safety} />}
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MapView
            routeData={routeData}
            floodZones={routeData?.floodWarnings}
          />
          {routeData && (
            <div className="card" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={statCard('#EEF6FF')}>
                <span style={{ fontSize: '1.75rem' }}>📏</span>
                <span style={{ fontWeight: 900, fontSize: '1.3rem' }}>{routeData.distanceKm} km</span>
                <span style={{ color: '#718096', fontWeight: 600, fontSize: '0.85rem' }}>Total Distance</span>
              </div>
              <div style={statCard('#FFF3E0')}>
                <span style={{ fontSize: '1.75rem' }}>⏱️</span>
                <span style={{ fontWeight: 900, fontSize: '1.3rem' }}>{routeData.travelTime.totalDuration} mins</span>
                <span style={{ color: '#718096', fontWeight: 600, fontSize: '0.85rem' }}>Est. Travel Time</span>
              </div>
              <div style={statCard('#E8F5E9')}>
                <span style={{ fontSize: '1.75rem' }}>🌧️</span>
                <span style={{ fontWeight: 900, fontSize: '1.3rem', textTransform: 'capitalize' }}>
                  {routeData.travelTime.rainLevel}
                </span>
                <span style={{ color: '#718096', fontWeight: 600, fontSize: '0.85rem' }}>Rain Level</span>
              </div>
              <div style={statCard('#FFE5E5')}>
                <span style={{ fontSize: '1.75rem' }}>🚨</span>
                <span style={{ fontWeight: 900, fontSize: '1.3rem' }}>{routeData.floodWarnings.length}</span>
                <span style={{ color: '#718096', fontWeight: 600, fontSize: '0.85rem' }}>Risk Zones</span>
              </div>
            </div>
          )}
          {routeData && <FloodWarning warnings={routeData.floodWarnings} />}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '1.5rem',
        color: '#718096',
        fontWeight: 600,
        fontSize: '0.85rem',
        borderTop: '2px solid #D6E8FF'
      }}>
        🌧️ MazhaPath — Built for Kerala's Monsoon Season
      </div>
    </div>
  );
}

const statCard = (bg) => ({
  background: bg,
  borderRadius: '16px',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25rem',
  border: '2px solid rgba(255,255,255,0.8)',
  textAlign: 'center'
});

export default App;
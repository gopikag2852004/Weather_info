const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const getBgColor = (condition) => {
    if (condition.includes('Extreme')) return '#FFE5E5';
    if (condition.includes('Heavy')) return '#FFF3E0';
    if (condition.includes('Moderate')) return '#E3F2FD';
    if (condition.includes('Light')) return '#E8F5E9';
    return '#F3F4F6';
  };

  return (
    <div className="card" style={{ background: getBgColor(weather.condition) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '3rem' }}>{weather.icon}</span>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{weather.city}</h3>
          <p style={{ color: '#718096', fontWeight: 600 }}>{weather.condition}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        <div style={statBox}>
          <span style={statValue}>💧 {weather.rainfall}</span>
          <span style={statLabel}>mm/hr</span>
        </div>
        <div style={statBox}>
          <span style={statValue}>💦 {weather.humidity}%</span>
          <span style={statLabel}>Humidity</span>
        </div>
        <div style={statBox}>
          <span style={statValue}>🌡️ {weather.temp}°C</span>
          <span style={statLabel}>Temp</span>
        </div>
      </div>
    </div>
  );
};

const statBox = {
  background: 'rgba(255,255,255,0.7)',
  borderRadius: '12px',
  padding: '0.5rem',
  textAlign: 'center',
  border: '2px solid rgba(255,255,255,0.9)'
};

const statValue = {
  display: 'block',
  fontWeight: 800,
  fontSize: '0.9rem'
};

const statLabel = {
  display: 'block',
  fontSize: '0.75rem',
  color: '#718096',
  fontWeight: 600
};

export default WeatherCard;
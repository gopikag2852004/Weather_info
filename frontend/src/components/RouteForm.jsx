import { useState } from 'react';

const keralaCities = [
  'Kochi', 'Thrissur', 'Kozhikode', 'Thiruvananthapuram',
  'Kannur', 'Alappuzha', 'Palakkad', 'Wayanad',
  'Malappuram', 'Kollam', 'Kottayam', 'Idukki',
  'Pathanamthitta', 'Kasaragod'
];

const RouteForm = ({ onSearch, loading }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = () => {
    if (!source || !destination) return;
    if (source === destination) {
      alert('Source and destination cannot be the same!');
      return;
    }
    onSearch(source, destination);
  };

  return (
    <div className="card">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#2C6FAC' }}>
          🌧️ MazhaPath
        </h1>
        <p style={{ color: '#718096', fontWeight: 600 }}>
          Kerala's Smart Monsoon Route Predictor
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>📍 From</label>
          <select
            className="input"
            style={{ borderRadius: '12px' }}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="">Select source city</option>
            {keralaCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>⬇️</div>

        <div>
          <label style={labelStyle}>🏁 To</label>
          <select
            className="input"
            style={{ borderRadius: '12px' }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Select destination city</option>
            {keralaCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading || !source || !destination}
          style={{ marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? '🔍 Calculating...' : '🌧️ Check Route'}
        </button>
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontWeight: 800,
  marginBottom: '0.4rem',
  fontSize: '0.9rem',
  color: '#4A5568'
};

export default RouteForm;
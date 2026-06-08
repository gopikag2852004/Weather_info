const FloodWarning = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null;

  const riskColors = {
    high: { bg: '#FFE5E5', border: '#FF6B6B', text: '#C62828', icon: '🚨' },
    medium: { bg: '#FFF3E0', border: '#FF9A3C', text: '#E65100', icon: '⚠️' },
    low: { bg: '#E8F5E9', border: '#6BCB77', text: '#2E7D32', icon: '📝' },
  };

  return (
    <div className="card">
      <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>
        🗺️ Flood Risk Zones on Route
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {warnings.map((zone) => {
          const colors = riskColors[zone.risk_level] || riskColors.low;
          return (
            <div key={zone.id} style={{
              background: colors.bg,
              border: `2px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{colors.icon}</span>
              <div>
                <p style={{ fontWeight: 800, color: colors.text }}>{zone.name}</p>
                <p style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>
                  {zone.district} — {zone.description}
                </p>
              </div>
              <span style={{
                marginLeft: 'auto',
                background: colors.border,
                color: 'white',
                borderRadius: '20px',
                padding: '0.2rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                {zone.risk_level}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloodWarning;
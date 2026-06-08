const DelayBadge = ({ travelTime }) => {
  if (!travelTime) return null;

  const levelColors = {
    none: { bg: '#E8F5E9', border: '#6BCB77', text: '#2E7D32' },
    light: { bg: '#E3F2FD', border: '#4A90D9', text: '#1565C0' },
    moderate: { bg: '#FFF3E0', border: '#FF9A3C', text: '#E65100' },
    heavy: { bg: '#FFE5E5', border: '#FF6B6B', text: '#C62828' },
    extreme: { bg: '#F3E5F5', border: '#9C27B0', text: '#6A1B9A' },
  };

  const colors = levelColors[travelTime.rainLevel] || levelColors.none;

  return (
    <div className="card" style={{ background: colors.bg, borderColor: colors.border }}>
      <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>
        ⏱️ Travel Time Estimate
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={timeBox('#F7FBFF')}>
          <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{travelTime.baseDuration}</span>
          <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: 600 }}>Base (mins)</span>
        </div>
        <div style={timeBox(colors.bg)}>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.text }}>+{travelTime.delayMinutes}</span>
          <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: 600 }}>Delay (mins)</span>
        </div>
        <div style={timeBox('#FFF')}>
          <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{travelTime.totalDuration}</span>
          <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: 600 }}>Total (mins)</span>
        </div>
      </div>
      <p style={{
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '12px',
        padding: '0.5rem 1rem',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        border: `2px solid ${colors.border}`
      }}>
        {travelTime.message}
      </p>
    </div>
  );
};

const timeBox = (bg) => ({
  background: bg,
  borderRadius: '12px',
  padding: '0.75rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  border: '2px solid rgba(255,255,255,0.9)'
});

export default DelayBadge;
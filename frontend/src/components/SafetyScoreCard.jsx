const SafetyScoreCard = ({ safety }) => {
  if (!safety) return null;

  const colorMap = {
    green: { bg: '#E8F5E9', border: '#6BCB77', text: '#2E7D32' },
    orange: { bg: '#FFF3E0', border: '#FF9A3C', text: '#E65100' },
    red: { bg: '#FFE5E5', border: '#FF6B6B', text: '#C62828' },
    darkred: { bg: '#F3E5F5', border: '#9C27B0', text: '#6A1B9A' },
  };

  const colors = colorMap[safety.color] || colorMap.green;
  const circumference = 2 * Math.PI * 40;
  const strokeDash = (safety.score / 100) * circumference;

  return (
    <div className="card" style={{ background: colors.bg, borderColor: colors.border }}>
      <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>
        🛡️ Route Safety Score
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke={colors.border}
            strokeWidth="10"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.text}>
            {safety.score}
          </text>
        </svg>
        <div>
          <p style={{
            fontSize: '1.3rem',
            fontWeight: 900,
            color: colors.text,
            marginBottom: '0.5rem'
          }}>
            {safety.label}
          </p>
          <p style={{ color: '#718096', fontWeight: 600, fontSize: '0.9rem' }}>
            Score out of 100 based on rainfall, flood zones and travel duration
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyScoreCard;
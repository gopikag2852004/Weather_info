const calculateSafetyScore = (rainfall, floodZonesCount, baseDuration) => {
  let score = 100;

  // Deduct for rainfall
  if (rainfall > 0 && rainfall <= 2.5) score -= 5;
  else if (rainfall > 2.5 && rainfall <= 7.5) score -= 15;
  else if (rainfall > 7.5 && rainfall <= 15) score -= 25;
  else if (rainfall > 15) score -= 40;

  // Deduct for flood zones on route
  score -= floodZonesCount * 10;

  // Deduct for long travel time during rain
  if (baseDuration > 60 && rainfall > 5) score -= 10;

  // Clamp between 0 and 100
  score = Math.max(0, Math.min(100, score));

  let label = '';
  let color = '';
  if (score >= 80) { label = 'Safe'; color = 'green'; }
  else if (score >= 60) { label = 'Moderate Risk'; color = 'orange'; }
  else if (score >= 40) { label = 'High Risk'; color = 'red'; }
  else { label = 'Dangerous'; color = 'darkred'; }

  return { score, label, color };
};

module.exports = { calculateSafetyScore };
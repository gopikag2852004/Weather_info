const calculateDelay = (rainfall) => {
  // rainfall in mm/hr
  if (rainfall === 0) {
    return { level: 'none', delay: 0, message: 'No rain, clear roads!' };
  } else if (rainfall > 0 && rainfall <= 2.5) {
    return { level: 'light', delay: 5, message: 'Light rain, slight delay expected.' };
  } else if (rainfall > 2.5 && rainfall <= 7.5) {
    return { level: 'moderate', delay: 15, message: 'Moderate rain, drive carefully.' };
  } else if (rainfall > 7.5 && rainfall <= 15) {
    return { level: 'heavy', delay: 30, message: 'Heavy rain! Expect significant delays.' };
  } else {
    return { level: 'extreme', delay: 60, message: '⚠️ Extreme rainfall! Avoid travel if possible.' };
  }
};

const calculateTotalTravelTime = (baseDurationMinutes, rainfall) => {
  const { delay, level, message } = calculateDelay(rainfall);
  return {
    baseDuration: baseDurationMinutes,
    delayMinutes: delay,
    totalDuration: baseDurationMinutes + delay,
    rainLevel: level,
    message
  };
};

module.exports = { calculateDelay, calculateTotalTravelTime };
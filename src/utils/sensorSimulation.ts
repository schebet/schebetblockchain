export function calculatePipeTemperature(hour: number): number {
  // Base temperature curve parameters
  const baseTemp = 8; // Base temperature
  const amplitude = 12; // Temperature range
  const peakHour = 14; // Peak temperature hour
  
  // Calculate temperature based on time of day
  const hourOffset = (hour - peakHour) * (Math.PI / 12);
  const tempVariation = amplitude * Math.cos(hourOffset);
  
  return baseTemp + tempVariation;
}

export function calculateDaylightLevel(hour: number): number {
  // Get current date
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  // Calculate sunrise and sunset times based on season
  const winterSolstice = 356; // December 21
  const summerSolstice = 172; // June 21
  
  // Calculate day length (in hours)
  const maxDayLength = 16; // Summer solstice
  const minDayLength = 8; // Winter solstice
  
  let dayLength;
  if (dayOfYear < summerSolstice) {
    // Increasing day length
    dayLength = minDayLength + ((maxDayLength - minDayLength) * (dayOfYear / summerSolstice));
  } else {
    // Decreasing day length
    const daysFromSummer = dayOfYear - summerSolstice;
    const daysToWinter = winterSolstice - summerSolstice;
    dayLength = maxDayLength - ((maxDayLength - minDayLength) * (daysFromSummer / daysToWinter));
  }
  
  // Calculate sunrise and sunset
  const sunrise = (24 - dayLength) / 2;
  const sunset = sunrise + dayLength;
  
  // Calculate light level based on time of day
  if (hour < sunrise || hour > sunset) {
    return 0; // Night time
  }
  
  // Calculate peak light level (middle of the day)
  const midday = sunrise + (dayLength / 2);
  const hourFromMidDay = Math.abs(hour - midday);
  const maxLightLevel = 100;
  
  return Math.max(0, Math.min(100, maxLightLevel * (1 - (hourFromMidDay / (dayLength / 2)))));
}
import type { EnergyData } from '../types';

export const generateMockData = (): EnergyData => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Solar generation follows daylight curve
  const solarMultiplier = currentHour >= 6 && currentHour <= 18 
    ? Math.sin(((currentHour - 6) / 12) * Math.PI) 
    : 0;
  
  // Wind generation is more variable
  const windMultiplier = 0.4 + Math.sin(Date.now() / 100000) * 0.3 + Math.random() * 0.3;
  
  // Generate 24-hour forecast data
  const generateForecast = (baseValue: number, pattern: 'solar' | 'wind' | 'consumption') => {
    return Array.from({ length: 24 }, (_, hour) => {
      if (pattern === 'solar') {
        return hour >= 6 && hour <= 18 
          ? baseValue * Math.sin(((hour - 6) / 12) * Math.PI) * (0.8 + Math.random() * 0.4)
          : Math.random() * 2;
      } else if (pattern === 'wind') {
        return baseValue * (0.4 + Math.sin((hour + 12) / 24 * Math.PI * 2) * 0.3 + Math.random() * 0.3);
      } else {
        // Consumption pattern: higher in morning and evening
        const morningPeak = Math.exp(-Math.pow((hour - 8) / 3, 2)) * 0.4;
        const eveningPeak = Math.exp(-Math.pow((hour - 18) / 3, 2)) * 0.6;
        const baseLoad = 0.5 + Math.sin((hour / 24) * Math.PI * 2) * 0.1;
        return baseValue * (baseLoad + morningPeak + eveningPeak + Math.random() * 0.1);
      }
    });
  };

  const solarCapacity = 200;
  const windCapacity = 150;
  const solarCurrent = solarCapacity * solarMultiplier * (0.8 + Math.random() * 0.4);
  const windCurrent = windCapacity * windMultiplier;
  
  const consumption = 80 + Math.sin(Date.now() / 50000) * 30 + Math.random() * 20;
  
  return {
    timestamp: now.toISOString(),
    solar: {
      current: Math.max(0, solarCurrent),
      capacity: solarCapacity,
      efficiency: Math.floor(75 + Math.random() * 15),
      forecast24h: generateForecast(solarCapacity, 'solar'),
    },
    wind: {
      current: Math.max(0, windCurrent),
      capacity: windCapacity,
      efficiency: Math.floor(65 + Math.random() * 20),
      forecast24h: generateForecast(windCapacity, 'wind'),
    },
    consumption: {
      current: consumption,
      forecast24h: generateForecast(consumption, 'consumption'),
      byCategory: {
        hvac: consumption * 0.4,
        lighting: consumption * 0.25,
        equipment: consumption * 0.2,
        other: consumption * 0.15,
      },
    },
    storage: {
      current: 180 + Math.sin(Date.now() / 200000) * 50,
      capacity: 300,
      chargeRate: Math.max(0, 15 + Math.random() * 10),
      dischargeRate: Math.max(0, 5 + Math.random() * 8),
      cycleCount: 1247,
    },
    grid: {
      import: Math.max(0, consumption - solarCurrent - windCurrent),
      export: Math.max(0, solarCurrent + windCurrent - consumption),
      cost: 4.5 + Math.random() * 1.5,
    },
    carbonSavings: {
      today: 45.2 + Math.random() * 10,
      monthly: 1250 + Math.random() * 200,
      yearly: 14800 + Math.random() * 2000,
      totalOffset: 87500 + Math.random() * 5000,
    },
    alerts: [
      ...(Math.random() > 0.8 ? [{
        id: '1',
        type: 'warning' as const,
        message: 'Wind turbine #2 efficiency below optimal threshold',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        acknowledged: false,
      }] : []),
      ...(Math.random() > 0.9 ? [{
        id: '2',
        type: 'info' as const,
        message: 'Scheduled maintenance reminder for solar panel cleaning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        acknowledged: false,
      }] : []),
    ],
  };
};
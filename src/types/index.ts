export interface EnergyData {
  timestamp: string;
  solar: {
    current: number;
    capacity: number;
    efficiency: number;
    forecast24h: number[];
  };
  wind: {
    current: number;
    capacity: number;
    efficiency: number;
    forecast24h: number[];
  };
  consumption: {
    current: number;
    forecast24h: number[];
    byCategory: {
      hvac: number;
      lighting: number;
      equipment: number;
      other: number;
    };
  };
  storage: {
    current: number;
    capacity: number;
    chargeRate: number;
    dischargeRate: number;
    cycleCount: number;
  };
  grid: {
    import: number;
    export: number;
    cost: number;
  };
  carbonSavings: {
    today: number;
    monthly: number;
    yearly: number;
    totalOffset: number;
  };
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export type UserRole = 'admin' | 'operator' | 'viewer';

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}
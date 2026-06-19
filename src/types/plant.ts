export interface PlantConfig {
  id: string;
  name: string;
  emoji: string;
  criticalThreshold: number;
  warningThreshold: number;
}

export interface SensorReading {
  moisture: number;
  temperature: number;
  humidity: number;
  light: number;
  timestamp: Date;
}

export interface PlantData {
  config: PlantConfig;
  current: SensorReading;
  history: SensorReading[];
  status: "healthy" | "warning" | "critical";
}

export interface Alert {
  id: string;
  plantId: string;
  plantName: string;
  message: string;
  level: "warning" | "critical";
  timestamp: Date;
}

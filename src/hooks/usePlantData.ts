import { useState, useEffect, useCallback } from "react";
import type { PlantConfig, PlantData, SensorReading, Alert } from "@/types/plant";

const DEFAULT_PLANTS: PlantConfig[] = [
  { id: "1", name: "Monstera", emoji: "🪴", criticalThreshold: 20, warningThreshold: 35 },
  { id: "2", name: "Snake Plant", emoji: "🌿", criticalThreshold: 15, warningThreshold: 30 },
  { id: "3", name: "Basil", emoji: "🌱", criticalThreshold: 30, warningThreshold: 45 },
];

const MAX_HISTORY = 10;

function generateReading(): SensorReading {
  return {
    moisture: Math.round(Math.random() * 80 + 10),
    temperature: Math.round((Math.random() * 15 + 18) * 10) / 10,
    humidity: Math.round(Math.random() * 40 + 40),
    light: Math.round(Math.random() * 800 + 200),
    timestamp: new Date(),
  };
}

function getStatus(moisture: number, config: PlantConfig): "healthy" | "warning" | "critical" {
  if (moisture < config.criticalThreshold) return "critical";
  if (moisture < config.warningThreshold) return "warning";
  return "healthy";
}

export function usePlantData() {
  const [plantConfigs, setPlantConfigs] = useState<PlantConfig[]>(DEFAULT_PLANTS);
  const [plantDataMap, setPlantDataMap] = useState<Record<string, PlantData>>({});
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const updateReadings = useCallback(() => {
    setPlantDataMap((prev) => {
      const next: Record<string, PlantData> = {};
      for (const config of plantConfigs) {
        const reading = generateReading();
        const existing = prev[config.id];
        const history = existing
          ? [...existing.history, reading].slice(-MAX_HISTORY)
          : [reading];
        const status = getStatus(reading.moisture, config);

        next[config.id] = { config, current: reading, history, status };

        if (status !== "healthy") {
          setAlerts((a) => [
            {
              id: `${config.id}-${Date.now()}`,
              plantId: config.id,
              plantName: config.name,
              message:
                status === "critical"
                  ? `${config.emoji} ${config.name} moisture critically low (${reading.moisture}%)`
                  : `${config.emoji} ${config.name} moisture below warning level (${reading.moisture}%)`,
              level: status,
              timestamp: new Date(),
            },
            ...a,
          ].slice(0, 50));
        }
      }
      return next;
    });
  }, [plantConfigs]);

  useEffect(() => {
    updateReadings();
    const interval = setInterval(updateReadings, 4000);
    return () => clearInterval(interval);
  }, [updateReadings]);

  const addPlant = (plant: Omit<PlantConfig, "id">) => {
    const newPlant = { ...plant, id: Date.now().toString() };
    setPlantConfigs((prev) => [...prev, newPlant]);
  };

  const updatePlant = (id: string, updates: Partial<PlantConfig>) => {
    setPlantConfigs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const removePlant = (id: string) => {
    setPlantConfigs((prev) => prev.filter((p) => p.id !== id));
    setPlantDataMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const plants = plantConfigs.map(
    (c) =>
      plantDataMap[c.id] ?? {
        config: c,
        current: generateReading(),
        history: [],
        status: "healthy" as const,
      }
  );

  return { plants, alerts, addPlant, updatePlant, removePlant, dismissAlert, plantConfigs };
}

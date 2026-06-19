import { useState, useEffect, useCallback } from "react";
import type { PlantConfig, PlantData, SensorReading, Alert } from "@/types/plant";

const DEFAULT_PLANTS: PlantConfig[] = [
  { id: "1", name: "Monstera", emoji: "🪴", criticalThreshold: 20, warningThreshold: 35 },
  { id: "2", name: "Snake Plant", emoji: "🌿", criticalThreshold: 15, warningThreshold: 30 },
  { id: "3", name: "Basil", emoji: "🌱", criticalThreshold: 30, warningThreshold: 45 },
];

// keep last 10 readings per plant
const HISTORY_LIMIT = 10;
const REFRESH_INTERVAL = 4000;

function generateReading(): SensorReading {
  return {
    moisture: Math.round(Math.random() * 80 + 10),
    temperature: Math.round((Math.random() * 15 + 18) * 10) / 10,
    humidity: Math.round(Math.random() * 40 + 40),
    light: Math.round(Math.random() * 800 + 200),
    timestamp: new Date(),
  };
}

function getPlantStatus(moisture: number, config: PlantConfig): PlantData["status"] {
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
      const updated: Record<string, PlantData> = {};

      for (const config of plantConfigs) {
        const reading = generateReading();
        const existing = prev[config.id];
        const history = existing
          ? [...existing.history, reading].slice(-HISTORY_LIMIT)
          : [reading];
        const status = getPlantStatus(reading.moisture, config);

        updated[config.id] = { config, current: reading, history, status };

        if (status !== "healthy") {
          const msg =
            status === "critical"
              ? `${config.emoji} ${config.name} moisture critically low (${reading.moisture}%)`
              : `${config.emoji} ${config.name} moisture below warning level (${reading.moisture}%)`;

          setAlerts((prev) =>
            [
              {
                id: `${config.id}-${Date.now()}`,
                plantId: config.id,
                plantName: config.name,
                message: msg,
                level: status,
                timestamp: new Date(),
              },
              ...prev,
            ].slice(0, 50)
          );
        }
      }

      return updated;
    });
  }, [plantConfigs]);

  useEffect(() => {
    updateReadings();
    const timer = setInterval(updateReadings, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [updateReadings]);

  const addPlant = (plant: Omit<PlantConfig, "id">) => {
    const newPlant = { ...plant, id: Date.now().toString() };
    setPlantConfigs((prev) => [...prev, newPlant]);
  };

  const updatePlant = (id: string, updates: Partial<PlantConfig>) => {
    setPlantConfigs((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
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

  // build the plants array from configs + live data
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

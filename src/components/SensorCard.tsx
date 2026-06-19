import { Droplets, Thermometer, Sun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlantData } from "@/types/plant";

const statusColors = {
  healthy: "border-l-emerald-500",
  warning: "border-l-amber-500",
  critical: "border-l-red-500",
};

const statusBadge = {
  healthy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  critical: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export const SensorCard = ({ plant }: { plant: PlantData }) => {
  const { config, current, status } = plant;

  return (
    <Card className={`border-l-4 ${statusColors[status]} transition-all hover:shadow-lg`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {config.emoji} {config.name}
          </CardTitle>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[status]}`}>
            {status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Moisture</p>
              <p className="text-sm font-semibold">{current.moisture}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">Temp</p>
              <p className="text-sm font-semibold">{current.temperature}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-teal-500" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm font-semibold">{current.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-xs text-muted-foreground">Light</p>
              <p className="text-sm font-semibold">{current.light} lux</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

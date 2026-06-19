import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlantData } from "@/types/plant";

interface Props {
  plant: PlantData;
}

export function SensorChart({ plant }: Props) {
  const chartData = plant.history.map((r, i) => ({
    time: `T${i + 1}`,
    Moisture: r.moisture,
    Temp: r.temperature,
    Humidity: r.humidity,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          {plant.config.emoji} {plant.config.name} — Sensor History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="Moisture" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Temp" stroke="#f97316" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Humidity" stroke="#14b8a6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

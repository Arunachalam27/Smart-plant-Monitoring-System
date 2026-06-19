import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Alert } from "@/types/plant";

export const AlertsPanel = ({
  alerts,
  onDismiss,
}: {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          🔔 Alerts
          {alerts.length > 0 && (
            <span className="rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
              {alerts.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              All plants are healthy! 🌱
            </p>
          ) : (
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start justify-between gap-2 rounded-lg border p-3 text-sm ${
                    alert.level === "critical"
                      ? "border-red-500/30 bg-red-500/5"
                      : "border-amber-500/30 bg-amber-500/5"
                  }`}
                >
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => onDismiss(alert.id)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

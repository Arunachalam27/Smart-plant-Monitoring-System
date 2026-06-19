import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PlantConfig } from "@/types/plant";

const EMOJIS = ["🪴", "🌿", "🌱", "🌵", "🌻", "🌷", "🌸", "🍀", "🌳", "🌾"];

interface PlantManagerProps {
  plants: PlantConfig[];
  onAdd: (plant: Omit<PlantConfig, "id">) => void;
  onUpdate: (id: string, updates: Partial<PlantConfig>) => void;
  onRemove: (id: string) => void;
}

export const PlantManager = ({ plants, onAdd, onUpdate, onRemove }: PlantManagerProps) => {
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", emoji: "🪴", criticalThreshold: 20, warningThreshold: 35 });

  const resetForm = () => {
    setForm({ name: "", emoji: "🪴", criticalThreshold: 20, warningThreshold: 35 });
    setEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editing) {
      onUpdate(editing, form);
    } else {
      onAdd(form);
    }
    resetForm();
  };

  const startEdit = (plant: PlantConfig) => {
    setEditing(plant.id);
    setForm({
      name: plant.name,
      emoji: plant.emoji,
      criticalThreshold: plant.criticalThreshold,
      warningThreshold: plant.warningThreshold,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Edit Plant" : "Add New Plant"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Plant Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Monstera"
                />
              </div>
              <div className="space-y-2">
                <Label>Emoji</Label>
                <div className="flex flex-wrap gap-1">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, emoji: e }))}
                      className={`text-xl p-1 rounded transition-colors ${
                        form.emoji === e ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Critical Threshold (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.criticalThreshold}
                  onChange={(e) => setForm((f) => ({ ...f, criticalThreshold: +e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Warning Threshold (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.warningThreshold}
                  onChange={(e) => setForm((f) => ({ ...f, warningThreshold: +e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                <Plus className="h-4 w-4 mr-1" />
                {editing ? "Update" : "Add Plant"}
              </Button>
              {editing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Plants ({plants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {plants.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No plants yet. Add one above!</p>
          ) : (
            <div className="space-y-2">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <span className="text-lg mr-2">{plant.emoji}</span>
                    <span className="font-medium">{plant.name}</span>
                    <span className="text-xs text-muted-foreground ml-3">
                      Critical: {plant.criticalThreshold}% · Warning: {plant.warningThreshold}%
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(plant)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onRemove(plant.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

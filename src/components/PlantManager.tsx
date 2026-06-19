import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PlantConfig } from "@/types/plant";

const PLANT_EMOJIS = ["🪴", "🌿", "🌱", "🌵", "🌻", "🌷", "🌸", "🍀", "🌳", "🌾"];

const defaultForm = {
  name: "",
  emoji: "🪴",
  criticalThreshold: 20,
  warningThreshold: 35,
};

interface Props {
  plants: PlantConfig[];
  onAdd: (plant: Omit<PlantConfig, "id">) => void;
  onUpdate: (id: string, updates: Partial<PlantConfig>) => void;
  onRemove: (id: string) => void;
}

export function PlantManager({ plants, onAdd, onUpdate, onRemove }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingId) {
      onUpdate(editingId, form);
    } else {
      onAdd(form);
    }
    resetForm();
  };

  const startEdit = (plant: PlantConfig) => {
    setEditingId(plant.id);
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
          <CardTitle>{editingId ? "Edit Plant" : "Add New Plant"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  {PLANT_EMOJIS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, emoji: e }))}
                      className={`rounded p-1 text-xl transition-colors ${
                        form.emoji === e
                          ? "bg-primary/20 ring-2 ring-primary"
                          : "hover:bg-muted"
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
                  onChange={(e) =>
                    setForm((f) => ({ ...f, criticalThreshold: +e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Warning Threshold (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.warningThreshold}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, warningThreshold: +e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Plus className="mr-1 h-4 w-4" />
                {editingId ? "Update" : "Add Plant"}
              </Button>
              {editingId && (
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
            <p className="py-4 text-center text-sm text-muted-foreground">
              No plants yet — add one above!
            </p>
          ) : (
            <div className="space-y-2">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <span className="mr-2 text-lg">{plant.emoji}</span>
                    <span className="font-medium">{plant.name}</span>
                    <span className="ml-3 text-xs text-muted-foreground">
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
}

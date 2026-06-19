import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SensorCard } from "@/components/SensorCard";
import { SensorChart } from "@/components/SensorChart";
import { AlertsPanel } from "@/components/AlertsPanel";
import { PlantManager } from "@/components/PlantManager";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePlantData } from "@/hooks/usePlantData";

type Page = "dashboard" | "manage";

const Index = () => {
  const [page, setPage] = useState<Page>("dashboard");
  const { plants, alerts, addPlant, updatePlant, removePlant, dismissAlert, plantConfigs } =
    usePlantData();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar activePage={page} onNavigate={setPage} />
        <main className="flex-1 overflow-auto">
          <header className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">
                {page === "dashboard" ? "🌱 Smart Plant Dashboard" : "⚙️ Manage Plants"}
              </h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="p-4 md:p-6">
            {page === "dashboard" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plants.map((plant) => (
                    <SensorCard key={plant.config.id} plant={plant} />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 space-y-4">
                    {plants.map((plant) => (
                      <SensorChart key={plant.config.id} plant={plant} />
                    ))}
                  </div>
                  <div>
                    <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />
                  </div>
                </div>
              </div>
            ) : (
              <PlantManager
                plants={plantConfigs}
                onAdd={addPlant}
                onUpdate={updatePlant}
                onRemove={removePlant}
              />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

# Plant Monitoring System

A real-time smart plant monitoring dashboard built with React, TypeScript, and Recharts.

## Features

- Live sensor data (moisture, temperature, humidity, light) per plant
- Historical trend charts with auto-refresh every 4 seconds
- Alert system for warning and critical moisture thresholds
- Add, edit, and remove plants with custom emoji and thresholds
- Dark/light/system theme support

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Recharts for data visualization
- TanStack Query

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  components/   # UI components (SensorCard, SensorChart, AlertsPanel, etc.)
  hooks/        # usePlantData - core data + state management
  pages/        # Index (main dashboard), NotFound
  types/        # TypeScript interfaces
  lib/          # Utility functions
```

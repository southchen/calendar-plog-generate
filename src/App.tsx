import { useRef } from 'react';
import { AppProvider } from './context/AppContext';
import Toolbar from './components/Toolbar';
import CalendarCanvas from './components/CalendarCanvas';
import StickerTray from './components/StickerTray';
import { useExport } from './hooks/useExport';

function AppContent() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { exportPng } = useExport(canvasRef);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Toolbar onExport={exportPng} />
      <div className="flex flex-1 overflow-hidden">
        <CalendarCanvas ref={canvasRef} />
        <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto flex-shrink-0">
          <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Stickers
          </h3>
          <StickerTray />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

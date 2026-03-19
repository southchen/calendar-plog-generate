import { useRef } from 'react';
import { AppProvider } from './context/AppContext';
import Toolbar from './components/Toolbar';
import CalendarCanvas from './components/CalendarCanvas';
import StickerTray from './components/StickerTray';
import { useExport } from './hooks/useExport';

function AppContent() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { exportPng, captureBlob } = useExport(canvasRef);

  return (
    <div className="h-screen flex flex-col bg-bg">
      <Toolbar onExport={exportPng} onCapture={captureBlob} />
      <div className="flex flex-1 overflow-hidden">
        <CalendarCanvas ref={canvasRef} />
        <div className="w-64 bg-surface border-l border-border p-4 overflow-y-auto flex-shrink-0">
          <h3 className="text-sm font-medium text-muted mb-3 uppercase tracking-wide font-body">
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

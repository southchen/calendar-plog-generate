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
    <div className="h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Toolbar onExport={exportPng} />
      <div className="flex flex-1 overflow-hidden">
        <CalendarCanvas ref={canvasRef} />
        <div
          className="w-64 p-8 overflow-y-auto shrink-0"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderLeft: '1px solid var(--color-border)',
          }}
        >
          <h3
            className="font-serif-display text-sm font-medium mb-4 uppercase tracking-widest"
            style={{ color: 'var(--color-muted)' }}
          >
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

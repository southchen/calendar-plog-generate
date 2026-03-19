import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import BackgroundLayer from './BackgroundLayer';
import CalendarGrid from './CalendarGrid';
import StickerLayer from './StickerLayer';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 900;

const CalendarCanvas = forwardRef<HTMLDivElement>((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { clientWidth, clientHeight } = container;
    const scaleX = clientWidth / CANVAS_WIDTH;
    const scaleY = clientHeight / CANVAS_HEIGHT;
    setScale(Math.min(scaleX, scaleY, 1));
  }, []);

  useEffect(() => {
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateScale]);

  return (
    <div ref={containerRef} className="flex-1 flex items-center justify-center p-4 overflow-hidden">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-lg shadow-lg flex-shrink-0"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <BackgroundLayer />
        <CalendarGrid />
        <StickerLayer />
      </div>
    </div>
  );
});

CalendarCanvas.displayName = 'CalendarCanvas';
export default CalendarCanvas;
export { CANVAS_WIDTH, CANVAS_HEIGHT };

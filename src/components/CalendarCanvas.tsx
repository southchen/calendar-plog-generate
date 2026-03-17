import { forwardRef } from 'react';
import BackgroundLayer from './BackgroundLayer';
import CalendarGrid from './CalendarGrid';
import StickerLayer from './StickerLayer';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 900;

const CalendarCanvas = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-sm shrink-0"
        style={{ border: '1px solid var(--color-border)' }}
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
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

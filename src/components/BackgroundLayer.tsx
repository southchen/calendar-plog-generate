import { useRef, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export default function BackgroundLayer() {
  const { state, dispatch } = useAppContext();
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!state.backgroundImage) return;
      dragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      posStart.current = { ...state.backgroundPosition };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [state.backgroundImage, state.backgroundPosition]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dispatch({
        type: 'SET_BACKGROUND_POSITION',
        x: posStart.current.x + dx,
        y: posStart.current.y + dy,
      });
    },
    [dispatch]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  if (!state.backgroundImage) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-amber-50 via-orange-50 to-rose-50" />
    );
  }

  return (
    <img
      src={state.backgroundImage}
      alt="background"
      className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
      crossOrigin="anonymous"
      draggable={false}
      style={{
        objectPosition: `calc(50% + ${state.backgroundPosition.x}px) calc(50% + ${state.backgroundPosition.y}px)`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
}

import { useCallback, type RefObject } from 'react';
import { toPng } from 'html-to-image';
import { useAppContext } from '../context/AppContext';

export function useExport(canvasRef: RefObject<HTMLDivElement | null>) {
  const { dispatch } = useAppContext();

  const exportPng = useCallback(async () => {
    if (!canvasRef.current) return;
    dispatch({ type: 'SET_EXPORTING', isExporting: true });

    // Wait for re-render to hide UI chrome
    await new Promise((r) => setTimeout(r, 100));

    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = 'cal-plog.png';
      link.href = dataUrl;
      link.click();
    } finally {
      dispatch({ type: 'SET_EXPORTING', isExporting: false });
    }
  }, [canvasRef, dispatch]);

  return { exportPng };
}

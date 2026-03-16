import { useState, useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';

export function useBackgroundRemoval() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const process = useCallback(async (imageSource: Blob): Promise<string> => {
    setIsProcessing(true);
    setProgress(0);
    try {
      const blob = await removeBackground(imageSource, {
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) setProgress(current / total);
        },
      });
      return URL.createObjectURL(blob);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, []);

  return { process, isProcessing, progress };
}

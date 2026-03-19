import { useRef } from 'react';
import { useBackgroundRemoval } from '../hooks/useBackgroundRemoval';
import { useAppContext } from '../context/AppContext';

export default function PhotoUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useAppContext();
  const { process, isProcessing, progress } = useBackgroundRemoval();

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      const resultUrl = await process(file);
      dispatch({ type: 'ADD_TRAY_ITEM', imageUrl: resultUrl });
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isProcessing}
        className="px-3 py-1.5 bg-accent text-white text-sm rounded-md hover:opacity-90
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-default ease-default cursor-pointer font-body"
      >
        {isProcessing ? `Extracting... ${Math.round(progress * 100)}%` : 'Upload Photo'}
      </button>
    </>
  );
}

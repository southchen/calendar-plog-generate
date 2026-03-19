import { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { fileToDataUrl } from '../utils/image';
import ShareButton from './ShareButton';

interface Props {
  onExport: () => void;
  onCapture: () => Promise<Blob | null>;
}

export default function Toolbar({ onExport, onCapture }: Props) {
  const { dispatch } = useAppContext();
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = async (files: FileList | null) => {
    if (!files?.[0]) return;
    const dataUrl = await fileToDataUrl(files[0]);
    dispatch({ type: 'SET_BACKGROUND', imageUrl: dataUrl });
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-surface border-b border-border shadow-sm transition-all duration-default ease-default">
      <h1 className="text-lg font-semibold text-ink mr-auto font-display">Cal Plog</h1>

      <input
        ref={bgInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleBgUpload(e.target.files)}
      />
      <button
        onClick={() => bgInputRef.current?.click()}
        className="px-3 py-1.5 bg-bg text-ink text-sm rounded-md
                   hover:bg-border transition-colors duration-default ease-default cursor-pointer font-body"
      >
        Set Background
      </button>

      <button
        onClick={onExport}
        className="px-3 py-1.5 bg-accent text-white text-sm rounded-md
                   hover:opacity-90 transition-colors duration-default ease-default cursor-pointer font-body"
      >
        Save Image
      </button>

      <ShareButton onCapture={onCapture} />
    </div>
  );
}

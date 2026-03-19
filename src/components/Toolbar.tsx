import { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { fileToDataUrl } from '../utils/image';
import PhotoUploader from './PhotoUploader';

interface Props {
  onExport: () => void;
}

export default function Toolbar({ onExport }: Props) {
  const { dispatch } = useAppContext();
  const bgInputRef = useRef<HTMLInputElement>(null);
  const stickerInputRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = async (files: FileList | null) => {
    if (!files?.[0]) return;
    const dataUrl = await fileToDataUrl(files[0]);
    dispatch({ type: 'SET_BACKGROUND', imageUrl: dataUrl });
  };

  const handleStickerUpload = async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      const dataUrl = await fileToDataUrl(file);
      dispatch({ type: 'ADD_TRAY_ITEM', imageUrl: dataUrl });
    }
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

      <PhotoUploader />

      <input
        ref={stickerInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleStickerUpload(e.target.files)}
      />
      <button
        onClick={() => stickerInputRef.current?.click()}
        className="px-3 py-1.5 bg-bg text-ink text-sm rounded-md
                   hover:bg-border transition-colors duration-default ease-default cursor-pointer font-body"
      >
        Upload Sticker
      </button>

      <button
        onClick={onExport}
        className="px-3 py-1.5 bg-accent text-white text-sm rounded-md
                   hover:opacity-90 transition-colors duration-default ease-default cursor-pointer font-body"
      >
        Save Image
      </button>
    </div>
  );
}

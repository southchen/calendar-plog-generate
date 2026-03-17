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
    <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800 mr-auto">Cal Plog</h1>

      <input
        ref={bgInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleBgUpload(e.target.files)}
      />
      <button
        onClick={() => bgInputRef.current?.click()}
        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg
                   hover:bg-gray-200 transition-colors cursor-pointer"
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
        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg
                   hover:bg-gray-200 transition-colors cursor-pointer"
      >
        Upload Sticker
      </button>

      <button
        onClick={onExport}
        className="px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg
                   hover:bg-emerald-600 transition-colors cursor-pointer"
      >
        Save Image
      </button>
    </div>
  );
}

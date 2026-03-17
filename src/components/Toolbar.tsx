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

  const btnBase =
    'px-4 py-2 text-sm transition-opacity duration-300 ease-out cursor-pointer rounded-sm';
  const btnSecondary = `${btnBase} border`;
  const btnPrimary = `${btnBase} text-white`;

  return (
    <div
      className="flex items-center gap-4 px-8 py-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <h1
        className="font-serif-display text-lg font-medium mr-auto"
        style={{ color: 'var(--color-accent)' }}
      >
        Cal Plog
      </h1>

      <input
        ref={bgInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleBgUpload(e.target.files)}
      />
      <button
        onClick={() => bgInputRef.current?.click()}
        className={btnSecondary}
        style={{
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
        }}
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
        className={btnSecondary}
        style={{
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
        }}
      >
        Upload Sticker
      </button>

      <button
        onClick={onExport}
        className={btnPrimary}
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        Save Image
      </button>
    </div>
  );
}

import { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { fileToDataUrl, getImageDimensions } from '../utils/image';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './CalendarCanvas';
import PhotoUploader from './PhotoUploader';

export default function StickerTray() {
  const { state, dispatch } = useAppContext();
  const stickerInputRef = useRef<HTMLInputElement>(null);

  const placeSticker = async (imageUrl: string) => {
    const dims = await getImageDimensions(imageUrl);
    const maxSize = 150;
    const scale = Math.min(maxSize / dims.width, maxSize / dims.height, 1);
    const width = Math.round(dims.width * scale);
    const height = Math.round(dims.height * scale);
    const x = Math.round((CANVAS_WIDTH - width) / 2);
    const y = Math.round((CANVAS_HEIGHT - height) / 2);
    dispatch({ type: 'PLACE_STICKER', imageUrl, x, y, width, height });
  };

  const handleStickerUpload = async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      const dataUrl = await fileToDataUrl(file);
      dispatch({ type: 'ADD_TRAY_ITEM', imageUrl: dataUrl });
    }
  };

  return (
    <div>
      {state.trayItems.length === 0 ? (
        <div className="text-muted text-sm text-center py-8 font-body">
          Upload photos to extract stickers
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {state.trayItems.map((url, i) => (
            <button
              key={i}
              onClick={() => placeSticker(url)}
              className="aspect-square bg-bg rounded-md p-2 hover:bg-border
                         transition-colors duration-default ease-default cursor-pointer border border-border"
              title="Click to place on canvas"
            >
              <img src={url} alt="sticker" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}

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
        className="w-full mt-3 px-3 py-1.5 bg-bg text-ink text-sm rounded-md
                   hover:bg-border transition-colors duration-default ease-default cursor-pointer font-body border border-border"
      >
        Upload Sticker
      </button>

      <div className="mt-2">
        <PhotoUploader />
      </div>
    </div>
  );
}

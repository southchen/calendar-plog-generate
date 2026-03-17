import { useAppContext } from '../context/AppContext';
import { getImageDimensions } from '../utils/image';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './CalendarCanvas';

export default function StickerTray() {
  const { state, dispatch } = useAppContext();

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

  if (state.trayItems.length === 0) {
    return (
      <div className="text-sm text-center py-8" style={{ color: 'var(--color-muted)' }}>
        Upload photos to extract stickers
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {state.trayItems.map((url, i) => (
        <button
          key={i}
          onClick={() => placeSticker(url)}
          className="aspect-square rounded-sm p-2 transition-opacity duration-300 ease-out
                     hover:opacity-70 cursor-pointer"
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
          }}
          title="Click to place on canvas"
        >
          <img src={url} alt="sticker" className="w-full h-full object-contain" />
        </button>
      ))}
    </div>
  );
}

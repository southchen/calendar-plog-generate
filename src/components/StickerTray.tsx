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
      <div className="text-gray-400 text-sm text-center py-8">
        Upload photos to extract stickers
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {state.trayItems.map((url, i) => (
        <button
          key={i}
          onClick={() => placeSticker(url)}
          className="aspect-square bg-gray-100 rounded-lg p-2 hover:bg-gray-200
                     transition-colors cursor-pointer border border-gray-200"
          title="Click to place on canvas"
        >
          <img src={url} alt="sticker" className="w-full h-full object-contain" />
        </button>
      ))}
    </div>
  );
}

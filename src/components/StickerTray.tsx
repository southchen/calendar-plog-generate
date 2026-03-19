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
      <div className="text-muted text-sm text-center py-8 font-body">
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
          className="aspect-square bg-bg rounded-md p-2 hover:bg-border
                     transition-colors duration-default ease-default cursor-pointer border border-border"
          title="Click to place on canvas"
        >
          <img src={url} alt="sticker" className="w-full h-full object-contain" />
        </button>
      ))}
    </div>
  );
}

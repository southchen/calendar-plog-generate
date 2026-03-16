import { Rnd } from 'react-rnd';
import { useAppContext } from '../context/AppContext';
import type { StickerData } from '../types';

interface Props {
  sticker: StickerData;
}

export default function Sticker({ sticker }: Props) {
  const { state, dispatch } = useAppContext();

  return (
    <Rnd
      position={{ x: sticker.x, y: sticker.y }}
      size={{ width: sticker.width, height: sticker.height }}
      onDragStop={(_e, d) =>
        dispatch({ type: 'UPDATE_STICKER', id: sticker.id, updates: { x: d.x, y: d.y } })
      }
      onResizeStop={(_e, _dir, ref, _delta, position) =>
        dispatch({
          type: 'UPDATE_STICKER',
          id: sticker.id,
          updates: {
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
            ...position,
          },
        })
      }
      lockAspectRatio
      bounds="parent"
      style={{ zIndex: sticker.zIndex }}
      onMouseDown={() => dispatch({ type: 'BRING_TO_FRONT', id: sticker.id })}
      className="group"
    >
      <div className="relative w-full h-full">
        <img
          src={sticker.imageUrl}
          alt="sticker"
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
        {!state.isExporting && (
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'REMOVE_STICKER', id: sticker.id });
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs
                       flex items-center justify-center opacity-0 group-hover:opacity-100
                       transition-opacity cursor-pointer shadow z-50"
          >
            x
          </button>
        )}
      </div>
    </Rnd>
  );
}

import { useAppContext } from '../context/AppContext';
import Sticker from './Sticker';

export default function StickerLayer() {
  const { state } = useAppContext();

  return (
    <div className="absolute inset-0 pointer-events-none *:pointer-events-auto">
      {state.stickers.map((s) => (
        <Sticker key={s.id} sticker={s} />
      ))}
    </div>
  );
}

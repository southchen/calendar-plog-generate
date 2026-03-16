import { useAppContext } from '../context/AppContext';

export default function BackgroundLayer() {
  const { state } = useAppContext();

  if (!state.backgroundImage) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />
    );
  }

  return (
    <img
      src={state.backgroundImage}
      alt="background"
      className="absolute inset-0 w-full h-full object-cover"
      crossOrigin="anonymous"
    />
  );
}

export interface StickerData {
  id: string;
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface AppState {
  year: number;
  month: number; // 0-indexed
  backgroundImage: string | null;
  backgroundPosition: { x: number; y: number };
  stickers: StickerData[];
  trayItems: string[]; // extracted image URLs
  nextZIndex: number;
  isExporting: boolean;
}

export type AppAction =
  | { type: 'SET_MONTH'; year: number; month: number }
  | { type: 'SET_BACKGROUND'; imageUrl: string }
  | { type: 'SET_BACKGROUND_POSITION'; x: number; y: number }
  | { type: 'ADD_TRAY_ITEM'; imageUrl: string }
  | { type: 'REMOVE_TRAY_ITEM'; imageUrl: string }
  | { type: 'PLACE_STICKER'; imageUrl: string; x: number; y: number; width: number; height: number }
  | { type: 'UPDATE_STICKER'; id: string; updates: Partial<StickerData> }
  | { type: 'REMOVE_STICKER'; id: string }
  | { type: 'BRING_TO_FRONT'; id: string }
  | { type: 'SET_EXPORTING'; isExporting: boolean };

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import type { AppState, AppAction } from '../types';

const now = new Date();

const initialState: AppState = {
  year: now.getFullYear(),
  month: now.getMonth(),
  backgroundImage: null,
  backgroundPosition: { x: 0, y: 0 },
  stickers: [],
  trayItems: [],
  nextZIndex: 1,
  isExporting: false,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MONTH':
      return { ...state, year: action.year, month: action.month };
    case 'SET_BACKGROUND':
      return { ...state, backgroundImage: action.imageUrl, backgroundPosition: { x: 0, y: 0 } };
    case 'SET_BACKGROUND_POSITION':
      return { ...state, backgroundPosition: { x: action.x, y: action.y } };
    case 'ADD_TRAY_ITEM':
      return { ...state, trayItems: [...state.trayItems, action.imageUrl] };
    case 'REMOVE_TRAY_ITEM':
      return { ...state, trayItems: state.trayItems.filter((u) => u !== action.imageUrl) };
    case 'PLACE_STICKER': {
      const sticker = {
        id: crypto.randomUUID(),
        imageUrl: action.imageUrl,
        x: action.x,
        y: action.y,
        width: action.width,
        height: action.height,
        zIndex: state.nextZIndex,
      };
      return {
        ...state,
        stickers: [...state.stickers, sticker],
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'UPDATE_STICKER':
      return {
        ...state,
        stickers: state.stickers.map((s) =>
          s.id === action.id ? { ...s, ...action.updates } : s
        ),
      };
    case 'REMOVE_STICKER':
      return { ...state, stickers: state.stickers.filter((s) => s.id !== action.id) };
    case 'BRING_TO_FRONT':
      return {
        ...state,
        stickers: state.stickers.map((s) =>
          s.id === action.id ? { ...s, zIndex: state.nextZIndex } : s
        ),
        nextZIndex: state.nextZIndex + 1,
      };
    case 'SET_EXPORTING':
      return { ...state, isExporting: action.isExporting };
    default:
      return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<AppAction> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

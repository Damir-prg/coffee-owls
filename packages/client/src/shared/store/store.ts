import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  TypedUseSelectorHook,
  useStore as useStoreBase,
} from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import ssrSlice from './ssr/ssrSlice';
import boardSlice from './board/boardSlice';
declare global {
  // отключаю правило для интерфейсов, чтобы обратиться к глобальному типу Window
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    APP_INITIAL_STATE: TRootState;
  }
}

export const reducer = combineReducers({
  user: userSlice,
  ssr: ssrSlice,
  board: boardSlice,
});

export const store = configureStore({
  reducer,
  preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
});

export type TRootState = ReturnType<typeof reducer>;
export type TAppDispatch = typeof store.dispatch;

export const useDispatch: () => TAppDispatch = useDispatchBase;
export const useSelector: TypedUseSelectorHook<TRootState> = useSelectorBase;
export const useStore: () => typeof store = useStoreBase;

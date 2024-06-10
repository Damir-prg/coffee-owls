import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { ISsrState } from './ssr.models';

const initialState: ISsrState = {
  pageHasBeenInitializedOnServer: false,
};

export const ssrSlice = createSlice({
  name: 'ssr',
  initialState,
  reducers: {
    setPageHasBeenInitializedOnServer: (state, { payload }: PayloadAction<boolean>) => {
      state.pageHasBeenInitializedOnServer = payload;
    },
  },
});

export const selectPageHasBeenInitializedOnServer = (state: TRootState) => state.ssr.pageHasBeenInitializedOnServer;

export const { setPageHasBeenInitializedOnServer } = ssrSlice.actions;

export default ssrSlice.reducer;

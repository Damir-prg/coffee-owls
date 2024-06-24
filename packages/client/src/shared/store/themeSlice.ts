import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETHEME } from 'shared/enums/theme';

const initialState = {
  theme: ETHEME.Light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ETHEME.Light | ETHEME.Dark>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

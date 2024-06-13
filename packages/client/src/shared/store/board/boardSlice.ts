import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBoardState } from './board.models';

const initialState: IBoardState = {
  score: {
    free: 0,
    time: 0,
  },
  time: ':',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setTime: (state, { payload }: PayloadAction<IBoardState['time']>) => {
      state.time = payload;
    },
    setScore: (state, { payload }: PayloadAction<IBoardState['score']>) => {
      state.score = payload;
    },
  },
});

export const { setScore, setTime } = boardSlice.actions;
export default boardSlice.reducer;

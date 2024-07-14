import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IForumState } from './forum.models';
import { TRootState } from 'shared/store/store';
import { ITopicPreviewItem } from 'shared/api/forumApi/forumApi.interface';
import { IForumTopic } from 'shared/constants/forum/types/Forum.models';
import { generateRandomColor } from 'shared/utils/RandomColorGenerator';

const initialState: IForumState = {
  topics: [],
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addTopics: (state, { payload }: PayloadAction<Array<ITopicPreviewItem>>) => {
      const newTopics: Array<IForumTopic> = payload.map(topic => ({
        ...topic,
        color: generateRandomColor(),
      }));
      state.topics = [...state.topics, ...newTopics];
    },
    clearTopics: state => {
      state.topics = [];
    },
  },
});

export const { addTopics, clearTopics } = forumSlice.actions;
export const getTopics = (state: TRootState) => state.forum.topics;

export default forumSlice.reducer;

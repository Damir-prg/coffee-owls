import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IForumState } from './forum.models';
import { TEST_TOPICS } from 'shared/store/forum/mock';
import { TRootState } from 'shared/store/store';
import { ITopicItem } from 'shared/api/forumApi/forumApi.interface';
import { IForumTopic } from 'shared/constants/forum/types/Forum.models';
import { generateRandomColor } from 'shared/utils/RandomColorGenerator';
// TODO удалить потом
import { mockUser } from '../../../../../server/mocks/index';

const initialState: IForumState = {
  topics: TEST_TOPICS,
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addTopics: (state, { payload }: PayloadAction<Array<ITopicItem>>) => {
      const newTopics: Array<IForumTopic> = payload.map(topic => ({
        ...topic,
        author: mockUser,
        color: generateRandomColor(),
        comments: [],
      }));
      state.topics = [...state.topics, ...newTopics];
    },
  },
});

export const { addTopics } = forumSlice.actions;
export const getTopics = (state: TRootState) => state.forum.topics;

export default forumSlice.reducer;

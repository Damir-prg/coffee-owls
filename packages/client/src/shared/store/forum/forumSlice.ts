import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IForumState } from './forum.models';
import { TEST_TOPICS } from 'shared/store/forum/mock';
import { TRootState } from 'shared/store/store';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import { ITopicComment, ITopicItem } from 'shared/api/forumApi/forumApi.interface';
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
    addComments: (
      state,
      {
        payload,
      }: PayloadAction<{
        topicID: number;
        comments: Array<ITopicComment>;
      }>,
    ) => {
      const topic = state.topics.find(({ id }) => id === payload.topicID);
      if (!topic) {
        return;
      }
      topic.comments = [
        ...topic.comments,
        ...payload.comments.map(comment => ({
          ...comment,
          reactions: [],
        })),
      ];
    },
    updateReaction: (
      state,
      {
        payload,
      }: PayloadAction<{
        topicID: number;
        commentID: number;
        reaction: EREACTION;
        isAdd?: boolean;
      }>,
    ) => {
      const topic = state.topics.find(({ id }) => id === payload.topicID);
      if (!topic) {
        return;
      }
      const comment = topic.comments.find(({ id }) => id === payload.commentID);
      if (!comment) {
        return;
      }

      if (comment.reactions.find(reaction => reaction === payload.reaction)) {
        if (!payload.isAdd) {
          comment.reactions = comment.reactions.filter(reaction => reaction !== payload.reaction);
        }
        return;
      }

      comment.reactions = [...comment.reactions, payload.reaction];
    },
  },
});

export const { addTopics, updateReaction, addComments } = forumSlice.actions;
export const getTopics = (state: TRootState) => state.forum.topics;

export const getSelectedTopic = (ID: number) => (state: TRootState) => {
  return state.forum.topics.find(({ id }) => id === ID) || null;
};

export const getSelectedComment = (topicID: number, commentID: number) => (state: TRootState) => {
  const topic = state.forum.topics.find(({ id }) => id === topicID);
  if (!topic) {
    return null;
  }
  return topic.comments.find(({ id }) => id === commentID) || null;
};
export default forumSlice.reducer;

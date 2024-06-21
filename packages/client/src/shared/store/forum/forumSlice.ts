import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IForumState } from './forum.models';
import { TEST_TOPICS } from 'shared/store/forum/mock';
import { TRootState } from 'shared/store/store';
import { TTopicComment } from 'shared/constants/forum';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';

const initialState: IForumState = {
  topics: TEST_TOPICS,
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addTopics: (state, { payload }: PayloadAction<IForumState['topics']>) => {
      state.topics = [...state.topics, ...payload];
    },
    addComment: (
      state,
      {
        payload,
      }: PayloadAction<{
        topicID: number;
        comment: TTopicComment;
      }>,
    ) => {
      const topic = state.topics.find(({ id }) => id === payload.topicID);
      if (!topic) {
        return;
      }
      topic.comments = [...topic.comments, payload.comment];
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

export const { addTopics, addComment, updateReaction } = forumSlice.actions;
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

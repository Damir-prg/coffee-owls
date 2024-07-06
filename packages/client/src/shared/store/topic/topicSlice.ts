import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TRootState } from 'shared/store/store';
import { ITopicState } from 'shared/store/topic/topic.model';
import { IReactionModel, ITopicComment } from 'shared/api/forumApi/forumApi.interface';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import { isReactionModel } from 'features/Reaction/utils/isReactionModel';

const initialState: ITopicState = {
  topic: null,
};

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    initTopic: (state, { payload }: PayloadAction<ITopicState['topic']>) => {
      state.topic = payload;
    },
    resetTopic: state => {
      state.topic = null;
    },
    addComment: (state, { payload }: PayloadAction<{ comment: ITopicComment }>) => {
      if (!state.topic) {
        return;
      }
      if (!state.topic.comments) {
        state.topic.comments = [];
      }
      state.topic.comments.push(payload.comment);
    },
    updateReaction: (
      state,
      {
        payload,
      }: PayloadAction<{
        commentID: number;
        reaction: IReactionModel | EREACTION;
        isAdd?: boolean;
      }>,
    ) => {
      const topic = state.topic;
      if (!topic) {
        return;
      }
      const comment = (topic.comments || []).find(({ id }) => id === payload.commentID);
      if (!comment) {
        return;
      }

      const selectedReaction = isReactionModel(payload.reaction)
        ? payload.reaction
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          comment.reactions.find(({ reaction }) => reaction === payload.reaction)!;
      if (!payload.isAdd) {
        comment.reactions = comment.reactions.filter(({ reaction }) => reaction !== selectedReaction.reaction);
        return;
      }

      comment.reactions.push(selectedReaction);
    },
  },
});

export const { initTopic, resetTopic, addComment, updateReaction } = topicSlice.actions;
export const getTopic = (state: TRootState) => state.topic.topic;
export const getSelectedComment = (commentID: number) => (state: TRootState) => {
  const topic = state.topic.topic;
  if (!topic) {
    return null;
  }
  return (topic.comments || []).find(({ id }) => id === commentID) || null;
};
export default topicSlice.reducer;

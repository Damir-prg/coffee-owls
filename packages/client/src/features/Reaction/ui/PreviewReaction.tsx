import React, { useCallback, useContext, useMemo } from 'react';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import '../styles/Reaction.css';
import { CommentContext } from 'widgets/ForumTopicComments/ui/ForumTopicComments';
import { ReactionList } from 'features/Reaction/ui/ReactionList';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'shared/store/store';
import { updateReaction, getSelectedComment } from 'shared/store/forum/forumSlice';
import { TopicContext } from 'pages/Topic/Topic';
import { delay } from 'shared/utils/delay';

export const PreviewReaction = () => {
  const dispatch = useDispatch();
  const topicID = useContext(TopicContext) || 0;
  const commentID = useContext(CommentContext) || 0;
  const comment = useSelector((state: TRootState) => getSelectedComment(topicID, commentID)(state));

  const removeReaction = useCallback(async (selectedReaction: EREACTION) => {
    /** Для отрисовки анимации клика */
    await delay(800);
    dispatch(
      updateReaction({
        topicID,
        commentID,
        reaction: selectedReaction,
      }),
    );
  }, []);

  return useMemo(() => {
    if (!comment?.reactions.length) {
      return null;
    }
    return <ReactionList reactions={comment.reactions} onClick={removeReaction} />;
  }, [comment?.reactions.length]);
};

import React, { useCallback, useContext, useMemo } from 'react';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import '../styles/Reaction.css';
import { CommentContext } from 'widgets/ForumTopicComments/ui/ForumTopicComments';
import { ReactionList } from 'features/Reaction/ui/ReactionList';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'shared/store/store';
import { delay } from 'shared/utils/delay';
import { getSelectedComment, updateReaction } from 'shared/store/topic/topicSlice';
import { deleteReaction } from 'shared/api/forumApi/forumApi';

export const PreviewReaction = () => {
  const dispatch = useDispatch();
  const commentID = useContext(CommentContext) || 0;
  const comment = useSelector((state: TRootState) => getSelectedComment(commentID)(state));

  const removeReaction = useCallback(async (selectedReaction: EREACTION) => {
    /** Для отрисовки анимации клика */
    await delay(800);

    const deletedReaction = await deleteReaction({
      commentId: commentID,
      reaction: selectedReaction,
    });

    if (!deletedReaction) {
      return console.error('Error during deleting comment');
    }

    dispatch(
      updateReaction({
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

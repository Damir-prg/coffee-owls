import React, { FC, useCallback, useContext } from 'react';
import { Popover } from 'antd';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import '../styles/Reaction.css';
import { ReactionList } from 'features/Reaction/ui/ReactionList';
import { CommentContext } from 'widgets/ForumTopicComments/ui/ForumTopicComments';
import { useDispatch } from 'react-redux';
import { addReaction } from 'shared/api/forumApi/forumApi';
import { updateReaction } from 'shared/store/topic/topicSlice';

export const AddReaction: FC<{ children?: React.ReactNode }> = React.memo(({ children }) => {
  const dispatch = useDispatch();
  const commentID = useContext(CommentContext) || 0;

  const handleAddReaction = useCallback(async (selectedReaction: EREACTION) => {
    const reaction = await addReaction({
      commentId: commentID,
      reaction: selectedReaction,
    });

    if (!reaction) {
      return console.error('Error during adding comment');
    }

    dispatch(
      updateReaction({
        commentID,
        reaction,
        isAdd: true,
      }),
    );
  }, []);

  return (
    <Popover
      content={<ReactionList reactions={Object.values(EREACTION)} onClick={handleAddReaction} />}
      placement="rightTop"
      trigger="contextMenu"
      className="add-reaction"
      overlayClassName="add-reaction-modal">
      {children}
    </Popover>
  );
});

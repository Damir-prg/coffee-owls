import React, { FC, useCallback, useContext, useMemo } from 'react';
import { Popover } from 'antd';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import '../styles/Reaction.css';
import { ReactionList } from 'features/Reaction/ui/ReactionList';
import { CommentContext } from 'widgets/ForumTopicComments/ui/ForumTopicComments';
import { useDispatch } from 'react-redux';
import { updateReaction } from 'shared/store/forum/forumSlice';
import { TopicContext } from 'pages/Topic/Topic';

export const AddReaction: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const topicID = useContext(TopicContext) || 0;
  const commentID = useContext(CommentContext) || 0;

  const addReaction = useCallback((selectedReaction: EREACTION) => {
    dispatch(
      updateReaction({
        topicID,
        commentID,
        reaction: selectedReaction,
        isAdd: true,
      }),
    );
  }, []);

  return useMemo(
    () => (
      <Popover
        content={<ReactionList reactions={Object.values(EREACTION)} onClick={addReaction} />}
        placement="rightTop"
        trigger="contextMenu"
        className="add-reaction"
        overlayClassName="add-reaction-modal">
        {children}
      </Popover>
    ),
    [],
  );
};

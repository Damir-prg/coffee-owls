import { Flex, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createContext, useCallback } from 'react';

import { ForumTopicComments } from 'widgets/ForumTopicComments';
import { ForumTopicHeader } from 'widgets/ForumTopicHeader';

import './Topic.css';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getSelectedTopic } from 'shared/store/forum/forumSlice';
import { TRootState } from 'shared/store/store';
import { useLocation } from 'react-router-dom';
import { selectUser } from 'shared/store/user/userSlice';
import { createComment } from 'shared/api/forumApi/forumApi';

/** Храним id топика */
export const TopicContext = createContext<number | null>(null);

const Topic = () => {
  const { Paragraph } = Typography;

  const user = useSelector(selectUser);

  const location = useLocation();
  const topicID = Number(location.pathname.split('/').pop());
  const topic = useSelector(state => getSelectedTopic(topicID)(state as TRootState));
  const dispatch = useDispatch();

  const handleAddComment = useCallback(async (message: string) => {
    if (!user) {
      return console.error('User id is not available');
    }

    const createdComment = await createComment(topicID, { text: message, userId: user?.id as number });

    if (!createdComment) {
      return console.error('Error during adding comment');
    }

    const createDate = new Date(createdComment.createdAt);
    const updateDate = new Date(createdComment.updatedAt);

    dispatch(
      addComment({
        topicID,
        comment: {
          updatedAt: `${updateDate.getDay()}.${updateDate.getMonth()}.${updateDate.getFullYear()}`,
          id: createdComment.id,
          text: createdComment.text,
          createdAt: `${createDate.getDay()}.${createDate.getMonth()}.${createDate.getFullYear()}`,
          author: createdComment.author,
          reactions: [],
        },
      }),
    );
  }, []);

  if (!topic) {
    return null;
  }

  return (
    <div className="topic__container">
      <ForumTopicHeader title={topic.title} />

      <div className="topic__info">
        <Flex className="topic__info-header" align="center" gap={16}>
          <Avatar shape="circle" size={48} icon={<UserOutlined />} />
          <Flex vertical align="flex-start" justify="center" gap={10} className="topic__info-title">
            <Paragraph className="topic__info-text">{topic.author.display_name}</Paragraph>
            <Paragraph className="topic__info-text">{topic.createdAt}</Paragraph>
          </Flex>
          <div style={{ backgroundColor: topic.color }} className="topic__info-tag" />
        </Flex>
        <Paragraph className="topic__info-description">{topic.description}</Paragraph>
      </div>

      <TopicContext.Provider value={topicID}>
        <ForumTopicComments comments={topic.comments} onAddComment={handleAddComment} />
      </TopicContext.Provider>
    </div>
  );
};

export default Topic;

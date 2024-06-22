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

/** Храним id топика */
export const TopicContext = createContext<number | null>(null);

const Topic = () => {
  const { Paragraph } = Typography;

  const user = useSelector(selectUser);

  const location = useLocation();
  const topicID = Number(location.pathname.split('/').pop());
  const topic = useSelector(state => getSelectedTopic(topicID)(state as TRootState));
  const dispatch = useDispatch();

  const handleAddComment = useCallback((message: string) => {
    const date = new Date();
    dispatch(
      addComment({
        topicID,
        comment: {
          id: topic?.comments.length || 0,
          content: message,
          created_at: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
          author: {
            username: user?.display_name || '',
            avatar: user?.avatar || '',
          },
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
            <Paragraph className="topic__info-text">{topic.author.username}</Paragraph>
            <Paragraph className="topic__info-text">{topic.created_at}</Paragraph>
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

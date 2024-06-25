import { Flex, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createContext, useCallback, useEffect } from 'react';

import { ForumTopicComments } from 'widgets/ForumTopicComments';
import { ForumTopicHeader } from 'widgets/ForumTopicHeader';

import './Topic.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectUser } from 'shared/store/user/userSlice';
import { createComment, getTopicById } from 'shared/api/forumApi/forumApi';
import { addComment, getTopic, initTopic, resetTopic } from 'shared/store/topic/topicSlice';

/** Храним id топика */
export const TopicContext = createContext<number | null>(null);

const Topic = () => {
  const { Paragraph } = Typography;

  const user = useSelector(selectUser);

  const location = useLocation();
  const topicID = Number(location.pathname.split('/').pop());
  const topic = useSelector(getTopic);
  const dispatch = useDispatch();

  const loadTopic = useCallback(async () => {
    const response = await getTopicById(topicID);

    if (!response) {
      return console.error('Error during load topic');
    }

    dispatch(initTopic(response));
  }, []);

  const handleAddComment = useCallback(async (message: string) => {
    if (!user) {
      return console.error('User id is not available');
    }

    const createdComment = await createComment(topicID, { text: message });

    if (!createdComment) {
      return console.error('Error during adding comment');
    }

    createdComment.reactions = [];
    dispatch(addComment({ comment: createdComment }));
  }, []);

  useEffect(() => {
    void loadTopic();
    return () => {
      dispatch(resetTopic());
    };
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
            <Paragraph className="topic__info-text">{topic?.author?.display_name}</Paragraph>
            <Paragraph className="topic__info-text">{topic?.createdAt}</Paragraph>
          </Flex>
        </Flex>
        <Paragraph className="topic__info-description">{topic.description}</Paragraph>
      </div>

      <TopicContext.Provider value={topicID}>
        <ForumTopicComments comments={topic?.comments || []} onAddComment={handleAddComment} />
      </TopicContext.Provider>
    </div>
  );
};

export default Topic;

import { Flex, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { TTopicComment, TTopicInfo, TopicInfo } from 'shared/constants/forum';

import { ForumTopicComments } from 'widgets/ForumTopicComments';
import { ForumTopicHeader } from 'widgets/ForumTopicHeader';

import './Topic.css';

const Topic = () => {
  const { Paragraph } = Typography;

  const [topicInfo, setTopicInfo] = useState<TTopicInfo>(TopicInfo);

  const handleAddComment = useCallback(
    (comment: TTopicComment) => {
      setTopicInfo(current => ({ ...current, comments: [...topicInfo.comments, comment] }));
    },
    [topicInfo],
  );

  return (
    <div className="topic__container">
      <ForumTopicHeader title={topicInfo.title} />

      <div className="topic__info">
        <Flex className="topic__info-header" align="center" gap={16}>
          <Avatar shape="circle" size={48} icon={<UserOutlined />} />
          <Flex vertical align="flex-start" justify="center" gap={10} className="topic__info-title">
            <Paragraph className="topic__info-text">{topicInfo.author.username}</Paragraph>
            <Paragraph className="topic__info-text">{topicInfo.created_at}</Paragraph>
          </Flex>
          <div style={{ backgroundColor: topicInfo.color }} className="topic__info-tag" />
        </Flex>
        <Paragraph className="topic__info-description">{topicInfo.description}</Paragraph>
      </div>

      <ForumTopicComments comments={topicInfo.comments} onAddComment={handleAddComment} />
    </div>
  );
};

export default Topic;

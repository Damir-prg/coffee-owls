import { Button, Flex, Typography, Avatar } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EROUTES from 'shared/RoutesEnum';
import { TTopicComment, TTopicInfo, TopicInfo } from './Topic.model';
import { AddCommentForm } from './ui/AddCommentForm';

import './Topic.css';

export function Topic() {
  const { Title, Paragraph } = Typography;

  const [topicInfo, setTopicInfo] = useState<TTopicInfo>(TopicInfo);

  const navigate = useNavigate();

  const handleAddComment = useCallback(
    (comment: TTopicComment) => {
      setTopicInfo(current => ({ ...current, comments: [...topicInfo.comments, comment] }));
    },
    [topicInfo],
  );

  const handleNavigateForum = useCallback(() => {
    navigate('/' + EROUTES.FORUM);
  }, [navigate]);

  return (
    <div className="topic__container">
      <Flex gap={8} justify="flex-start" align="center" className="topic__container-header">
        <Button
          onClick={handleNavigateForum}
          type="text"
          icon={<LeftOutlined className="topic__container_header-back" />}
        />
        <Title level={3}>{topicInfo.title}</Title>
      </Flex>

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

      <Flex vertical className="topic__comments" gap={16}>
        <Title level={3} className="topic__comments-title">
          Комментарии пользователей:
        </Title>

        {topicInfo.comments.length ? (
          topicInfo.comments.map(comment => {
            return (
              <div key={comment.id}>
                <Flex align="center" gap={16}>
                  <Avatar shape="circle" size={36} icon={<UserOutlined />} />
                  <Flex vertical align="flex-start" justify="center" gap={10} className="topic__info-title">
                    <Paragraph className="topic__info-text">{comment.author.username}</Paragraph>
                    <Paragraph className="topic__info-text">{comment.created_at}</Paragraph>
                  </Flex>
                </Flex>
                <Paragraph className="topic__comments-content">{comment.content}</Paragraph>
              </div>
            );
          })
        ) : (
          <Paragraph className="topic__info-text">Комментариев не найдено.</Paragraph>
        )}

        <AddCommentForm onAddComment={handleAddComment} />
      </Flex>
    </div>
  );
}

export default Topic;

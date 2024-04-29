import { Avatar, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { AddTopicCommentForm } from 'features/AddForumTopicComment';
import { TTopicComment } from 'shared/constants/forum';

import './ForumTopicComments.css';

type TProps = {
  comments: TTopicComment[];
  onAddComment: (comment: TTopicComment) => void;
};

export function ForumTopicComments({ comments, onAddComment }: TProps) {
  const { Title, Paragraph } = Typography;

  return (
    <Flex vertical className="topic__comments" gap={16}>
      <Title level={3} className="topic__comments-title">
        Комментарии пользователей:
      </Title>

      {comments.length ? (
        comments.map(comment => {
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

      <AddTopicCommentForm onAddComment={onAddComment} />
    </Flex>
  );
}

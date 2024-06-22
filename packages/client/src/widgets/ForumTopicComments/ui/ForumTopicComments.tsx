import { Avatar, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { AddTopicCommentForm } from 'features/AddForumTopicComment';
import { TTopicComment } from 'shared/constants/forum';

import './ForumTopicComments.css';
import React, { createContext } from 'react';
import { AddReaction, PreviewReaction } from 'features/Reaction';

/** ID текущего комментария */
export const CommentContext = createContext<number | null>(null);

type TProps = {
  comments: TTopicComment[];
  onAddComment: (message: string) => void;
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
            <CommentContext.Provider value={comment.id} key={comment.id}>
              <AddReaction>
                <Flex align="center" gap={16}>
                  <Avatar shape="circle" size={36} icon={<UserOutlined />} />
                  <Flex vertical align="flex-start" justify="center" gap={10} className="topic__info-title">
                    <Paragraph className="topic__info-text">{comment.author.username}</Paragraph>
                    <Paragraph className="topic__info-text">{comment.created_at}</Paragraph>
                  </Flex>
                </Flex>
                <Flex justify="space-between" align="flex-end" gap={8}>
                  <Paragraph className="topic__comments-content">{comment.content}</Paragraph>
                  <PreviewReaction />
                </Flex>
              </AddReaction>
            </CommentContext.Provider>
          );
        })
      ) : (
        <Paragraph className="topic__info-text">Комментариев не найдено.</Paragraph>
      )}

      <AddTopicCommentForm onAddComment={onAddComment} />
    </Flex>
  );
}

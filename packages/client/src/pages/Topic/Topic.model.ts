export type TAuthor = {
  username: string;
  avatar: string;
};

export type TTopicComment = {
  id: number;
  content: string;
  author: TAuthor;
  created_at: string;
};

export type TTopicInfo = {
  id: number;
  title: string;
  description: string;
  color: string;
  author: TAuthor;
  created_at: string;
  comments: TTopicComment[];
};

export const TopicInfo: TTopicInfo = {
  id: 1,
  title: 'Стратегии игры',
  description: 'Опишите свои стратегии игры...',
  color: 'purple',
  author: {
    username: 'user01',
    avatar: '',
  },
  created_at: '12.02.2021',
  comments: [],
};

import { EREACTION } from 'features/Reaction/types/AddReaction.types';

export type TAuthor = {
  username: string;
  avatar: string;
};

export type TTopicComment = {
  id: number;
  content: string;
  author: TAuthor;
  created_at: string;
  reactions: Array<EREACTION>;
};

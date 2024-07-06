import { IUser } from '../authApi/auth.interface';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';

export interface IID {
  id?: number;
}

interface IDateCreate {
  createdAt?: string;
}

interface IDateUpdate {
  updatedAt?: string;
}

interface ITopicAuthor {
  author?: Partial<IUser>;
}

export interface ITopicComment extends IID, IDateCreate, IDateUpdate, ITopicAuthor {
  text?: string;
  reactions: Array<IReactionModel>;
}

export interface ICreateComment {
  text?: string;
}

export interface ICreateTopic {
  title?: string;
  description?: string;
}

export interface ITopicItem extends IID {
  title?: string;
  description?: string;
  commentsCount?: string;
}

export interface ITopicDetails extends ITopicItem, ITopicAuthor, IDateCreate {
  comments?: Array<ITopicComment>;
}

export interface IReactionData {
  commentId: number;
  reaction: EREACTION;
}

export interface IReactionModel {
  commentId: number;
  reaction: EREACTION;
  id: number;
}

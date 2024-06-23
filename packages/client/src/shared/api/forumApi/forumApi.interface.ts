import { IUser } from '../authApi/auth.interface';

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

export interface ICreateTopic {
  title?: string;
  content?: string;
  authorId?: number;
}

export interface ITopicComment extends IID, IDateCreate, IDateUpdate, ITopicAuthor {
  text?: string;
}

export interface ICreateComment {
  text?: string;
  userId?: number;
}

export interface ITopicItem extends IID, IDateCreate {
  title?: string;
  commentCount?: string;
}

export interface ITopicDetails extends ITopicItem, ITopicAuthor, IDateUpdate {
  description?: string;
  comments?: Array<ITopicComment>;
}

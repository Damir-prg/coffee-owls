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

export interface ITopicComment extends IID, IDateCreate, IDateUpdate, ITopicAuthor {
  text?: string;
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

import { IUser } from '../authApi/auth.interface';

export interface IID {
  id: number;
}

interface IDateCreate {
  createdAt: string;
}

interface IDateUpdate {
  updatedAt: string;
}

interface ITopicAuthor {
  author: IUser;
}

export interface ICreateTopic {
  title: string;
  description: string;
  authorId: number;
}

export interface ITopicComment extends IID, IDateCreate, IDateUpdate, ITopicAuthor {
  text: string;
}

export interface ICreateComment {
  text: string;
  userId: number;
}

export interface ITopicItem extends IID, IDateCreate, ITopicAuthor {
  title: string;
  description: string;
  commentCount: string;
}

export interface ITopicDetails extends ITopicItem {
  comments: Array<ITopicComment>;
}

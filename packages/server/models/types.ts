import type { Request } from 'express';

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface ITopic {
  id: number;
  title: string;
  description: string;
  authorId: number;
}

export interface IComment {
  id: number;
  text: string;
  authorId: number;
  topicId: number;
}

export type TReaction = 'love' | 'cry' | 'eyes' | 'fire' | 'laugh';
export interface IReaction {
  id: number;
  commentId: number;
  reaction: TReaction;
}

export interface IAuthenticatedRequest extends Request {
  authUser?: IUser;
}

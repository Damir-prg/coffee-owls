import { IUser } from '../authApi/auth.interface';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';

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

/**
 * Поля для создания нового топика
 * */
export interface ITopicInfo {
  title: string;
  description: string;
}

/**
 * Список всех топиков
 * */
export interface ITopicPreviewItem extends IID, ITopicInfo {
  commentsCount: string;
}

/**
 * Ответ при создании нового топика
 * */
export interface ITopicCreateResponse extends IID, ITopicInfo, IDateCreate, IDateUpdate {
  authorId: string;
}

export interface ITopicComment extends IID, IDateCreate, IDateUpdate, ITopicAuthor {
  text: string;
  reactions: Array<IReactionModel>;
}

/**
 * Подробная информация о топике
 * */
export interface ITopicDetails extends IID, ITopicInfo, IDateCreate, IDateUpdate, ITopicAuthor {
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

/**
 * Создание нового комментария
 * */
export interface ICreateComment {
  text: string;
}

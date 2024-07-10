import api from '../api';
import {
  IReactionData,
  ICreateComment,
  ICreateTopic,
  IReactionModel,
  ITopicComment,
  ITopicDetails,
  ITopicItem,
} from './forumApi.interface';
const forumUrl = `${import.meta.env.VITE_SERVER_URL}/api`;

export const getTopics = (): Promise<Array<ITopicItem> | null> => {
  return api.get(`${forumUrl}/topics`);
};

export const createTopic = (data: ICreateTopic): Promise<ITopicItem | null> => {
  return api.post(`${forumUrl}/topics`, { data });
};

export const getTopicById = (id: number): Promise<ITopicDetails | null> => {
  return api.get(`${forumUrl}/topics/${id}`);
};

export const createComment = (id: number, data: ICreateComment): Promise<ITopicComment | null> => {
  return api.post(`${forumUrl}/topics/${id}/comments`, { data });
};

export const addReaction = (data: IReactionData): Promise<IReactionModel | null> => {
  return api.post(`${forumUrl}/reaction`, { data });
};

export const deleteReaction = (data: IReactionData): Promise<null | 'deleted'> => {
  return api.delete(`${forumUrl}/reaction`, { data });
};

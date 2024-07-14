import api from '../api';
import {
  IReactionData,
  ICreateComment,
  IReactionModel,
  ITopicComment,
  ITopicDetails,
  ITopicPreviewItem,
  ITopicInfo,
  ITopicCreateResponse,
} from './forumApi.interface';
const forumUrl = '/api';

export const getTopics = (): Promise<Array<ITopicPreviewItem> | null> => {
  return api.get(`${forumUrl}/topics`);
};

export const createTopic = (data: ITopicInfo): Promise<ITopicCreateResponse | null> => {
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

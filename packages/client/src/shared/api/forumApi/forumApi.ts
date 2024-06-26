import api from '../api';
import { ICreateComment, ICreateTopic, ITopicComment, ITopicDetails, ITopicItem } from './forumApi.interface';
const forumUrl = 'http://localhost:3001/api';

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

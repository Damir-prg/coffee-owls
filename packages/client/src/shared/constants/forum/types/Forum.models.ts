import { TAuthor, TTopicComment } from 'shared/constants/forum';

export interface IForumTopic {
  id: number;
  title: string;
  description: string;
  color: string;
  author: TAuthor;
  created_at: string;
  comments: TTopicComment[];
}

export type TAddTopicFormValues = {
  title: string;
};

export const ADD_FORUM_FORM_ID = 'add-topic-form';

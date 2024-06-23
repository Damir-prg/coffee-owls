import { TTopicComment } from 'shared/constants/forum';
import { ITopicDetails } from 'shared/api/forumApi/forumApi.interface';

export interface IForumTopic extends ITopicDetails {
  color: string;
  comments: TTopicComment[];
}

export const ADD_FORUM_FORM_ID = 'add-topic-form';

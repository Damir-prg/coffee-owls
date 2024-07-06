import { ITopicDetails } from 'shared/api/forumApi/forumApi.interface';

export interface IForumTopic extends ITopicDetails {
  color: string;
}

export const ADD_FORUM_FORM_ID = 'add-topic-form';

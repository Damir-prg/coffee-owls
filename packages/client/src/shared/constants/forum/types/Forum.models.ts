import { ITopicPreviewItem } from 'shared/api/forumApi/forumApi.interface';

export interface IForumTopic extends ITopicPreviewItem {
  color: string;
}

export const ADD_FORUM_FORM_ID = 'add-topic-form';

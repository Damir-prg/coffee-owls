export type TForumItem = {
  key: string;
  color: string;
  title: string;
  comments: number;
};

export type TAddTopicFormValues = {
  title: string;
};

export const ADD_FORUM_FORM_ID = 'add-topic-form';

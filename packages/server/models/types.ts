export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
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

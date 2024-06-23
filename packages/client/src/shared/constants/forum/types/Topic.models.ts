import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import { ITopicComment } from 'shared/api/forumApi/forumApi.interface';

export type TTopicComment = ITopicComment & {
  reactions: Array<EREACTION>;
};

import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import { IReactionModel } from 'shared/api/forumApi/forumApi.interface';

export function isReactionModel(reaction: EREACTION | IReactionModel): reaction is IReactionModel {
  return (reaction as IReactionModel).reaction !== undefined;
}

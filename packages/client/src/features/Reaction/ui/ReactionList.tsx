import React, { FC, useMemo } from 'react';
import { Button, Flex } from 'antd';
import { EREACTION, REACTION_ICON } from 'features/Reaction/types/AddReaction.types';
import '../styles/Reaction.css';
import { IReactionModel } from 'shared/api/forumApi/forumApi.interface';
import { isReactionModel } from 'features/Reaction/utils/isReactionModel';

export interface IReactionList {
  reactions: Array<EREACTION | IReactionModel>;
  onClick: (reaction: EREACTION) => void;
}

export const ReactionList: FC<IReactionList> = ({ reactions, onClick }) => {
  return useMemo(() => {
    return (
      <Flex gap={8}>
        {reactions.map((reaction, index) => {
          const reactionValue = isReactionModel(reaction) ? reaction.reaction : reaction;
          return (
            <Button key={index} shape="circle" onClick={() => onClick(reactionValue)}>
              {REACTION_ICON[reactionValue]}
            </Button>
          );
        })}
      </Flex>
    );
  }, [reactions]);
};

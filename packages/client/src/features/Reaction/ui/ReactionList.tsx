import React, { FC, useMemo } from 'react';
import { Button, Flex } from 'antd';
import { EREACTION, REACTION_ICON } from 'features/Reaction/types/AddReaction.types';
import '../styles/Reaction.css';

export interface IReactionList {
  reactions: Array<EREACTION>;
  onClick: (reaction: EREACTION) => void;
}
export const ReactionList: FC<IReactionList> = ({ reactions, onClick }) => {
  return useMemo(() => {
    return (
      <Flex gap={8}>
        {reactions.map((reaction, index) => (
          <Button key={index} shape="circle" onClick={() => onClick(reaction)}>
            {REACTION_ICON[reaction]}
          </Button>
        ))}
      </Flex>
    );
  }, [reactions]);
};

import { PropsWithChildren, FC } from 'react';
import '../styles/GameContentContainer.css';
import { Flex } from 'antd';

export const GameContentContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex vertical align="center" justify="center" gap={32} className="game__content-container">
      {children}
    </Flex>
  );
};

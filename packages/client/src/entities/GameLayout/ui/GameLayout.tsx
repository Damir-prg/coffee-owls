import '../styles/GameLayout.css';
import { Flex } from 'antd';
import { PropsWithChildren, FC } from 'react';

export const GameLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex vertical align="center" justify="center" flex={1}>
      <Flex vertical align="center" justify="center" className="game__layout">
        {children}
      </Flex>
    </Flex>
  );
};

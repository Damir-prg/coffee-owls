import { FC } from 'react';
import { GameContextInstance } from '../lib/contextInstance';
import { TGameContextConsumer } from '../types/GameContextTypes';

export const GameContextConsumer: FC<TGameContextConsumer> = ({ children }) => {
  return <GameContextInstance.Consumer>{children}</GameContextInstance.Consumer>;
};

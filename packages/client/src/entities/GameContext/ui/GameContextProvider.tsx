import { FC, PropsWithChildren, useState } from 'react';
import { EGAME_MODE_VALUES } from 'shared/constants/game';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game/types/ScreensEnum';
import { GameContextInstance } from '../lib/contextInstance';

export const GameContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gameMode, setGameMode] = useState<EGAME_MODE_VALUES>(EGAME_MODE_VALUES.FREE_PLAY);
  const [gameScreen, setGameScreen] = useState<EGAME_SCREEN_VALUES>(EGAME_SCREEN_VALUES.START_GAME);

  return (
    <GameContextInstance.Provider value={{ gameMode, setGameMode, gameScreen, setGameScreen }}>
      {children}
    </GameContextInstance.Provider>
  );
};

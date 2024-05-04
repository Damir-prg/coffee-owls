import { ReactNode } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { EndGameForm } from 'widgets/EndGameForm';
import { GameCountdownForm } from 'widgets/GameCountdownForm';
import { StartGameForm } from 'widgets/StartGameForm';

export const GameScreens: Record<EGAME_SCREEN_VALUES, ReactNode> = {
  [EGAME_SCREEN_VALUES.START_GAME]: <StartGameForm />,
  [EGAME_SCREEN_VALUES.TIMER]: <GameCountdownForm />,
  [EGAME_SCREEN_VALUES.SETTINGS]: <></>,
  [EGAME_SCREEN_VALUES.END_GAME]: <EndGameForm />,
};

import { ReactNode } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { GameCountdownForm } from 'widgets/GameCountdownForm';
import { StartGameForm } from 'widgets/StartGameForm';

export const GameScreens: Record<EGAME_SCREEN_VALUES, ReactNode> = {
  'start-game': <StartGameForm />,
  timer: <GameCountdownForm />,
  settings: <></>,
};

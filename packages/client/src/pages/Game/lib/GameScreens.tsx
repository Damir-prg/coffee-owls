import { ReactNode } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { GameCountdownForm } from 'widgets/GameCountdownForm';
import { StartGameForm } from 'widgets/StartGameForm';
import { GameContentContainer } from 'entities/GameContentContainer';

export const GameScreens: Record<EGAME_SCREEN_VALUES, ReactNode> = {
  [EGAME_SCREEN_VALUES.START_GAME]: (
    <GameContentContainer>
      <StartGameForm />
    </GameContentContainer>
  ),
  [EGAME_SCREEN_VALUES.TIMER]: (
    <GameContentContainer>
      <GameCountdownForm />
    </GameContentContainer>
  ),
  [EGAME_SCREEN_VALUES.SETTINGS]: <></>,
};

import { ReactNode } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { EndGameForm } from 'widgets/EndGameForm';
import { GameCountdownForm } from 'widgets/GameCountdownForm';
import { StartGameForm } from 'widgets/StartGameForm';
import { GameContentContainer } from 'entities/GameContentContainer';
import { GameCanvas } from 'widgets/GameCanvas';

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
  [EGAME_SCREEN_VALUES.GAME]: <GameCanvas />,
  [EGAME_SCREEN_VALUES.SETTINGS]: <></>,
  [EGAME_SCREEN_VALUES.END_GAME]: (
    <GameContentContainer>
      <EndGameForm />
    </GameContentContainer>
  ),
};

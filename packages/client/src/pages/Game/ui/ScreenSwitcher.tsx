import { GameContextConsumer } from 'entities/GameContext';
import { GameScreens } from '../lib/GameScreens';
import { GameContentContainer } from 'entities/GameContentContainer';

export const ScreenSwitcher = () => {
  return (
    <GameContentContainer>
      <GameContextConsumer>{({ gameScreen }) => GameScreens[gameScreen]}</GameContextConsumer>
    </GameContentContainer>
  );
};

import { GameContextConsumer, GameContextInstance } from 'entities/GameContext';
import { GameScreens } from '../lib/GameScreens';
import { GameContentContainer } from 'entities/GameContentContainer';
import { useContext, useEffect } from 'react';

export const ScreenSwitcher = () => {
  const { gameScreen } = useContext(GameContextInstance);

  useEffect(() => {
    console.log(`Активная страница игры: ${gameScreen}`);
  }, [gameScreen]);
  return (
    <GameContentContainer>
      <GameContextConsumer>{({ gameScreen }) => GameScreens[gameScreen]}</GameContextConsumer>
    </GameContentContainer>
  );
};

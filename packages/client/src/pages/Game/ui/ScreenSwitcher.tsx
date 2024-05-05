import { GameContextConsumer, GameContextInstance } from 'entities/GameContext';
import { GameScreens } from '../lib/GameScreens';
import { useContext, useEffect } from 'react';

export const ScreenSwitcher = () => {
  const { gameScreen } = useContext(GameContextInstance);

  useEffect(() => {
    console.log(`Активный экран игры: ${gameScreen}`);
  }, [gameScreen]);

  return <GameContextConsumer>{({ gameScreen }) => GameScreens[gameScreen]}</GameContextConsumer>;
};

import { GameContextConsumer, GameContextInstance } from 'entities/GameContext';
import { GameScreens } from '../lib/GameScreens';
import { useContext, useEffect } from 'react';
import { useAudio } from 'shared/hooks/useAudio';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';

export const ScreenSwitcher = () => {
  const { gameScreen } = useContext(GameContextInstance);

  const playStartGameSound = useAudio('/sounds/mus_f_glock.mp3');
  const playEndGameSound = useAudio('/sounds/mus_chime.mp3');

  useEffect(() => {
    console.log(`Активный экран игры: ${gameScreen}`);

    if (gameScreen === EGAME_SCREEN_VALUES.GAME) {
      playStartGameSound();
    }

    if (gameScreen === EGAME_SCREEN_VALUES.END_GAME) {
      playEndGameSound();
    }
  }, [gameScreen]);

  return <GameContextConsumer>{({ gameScreen }) => GameScreens[gameScreen]}</GameContextConsumer>;
};

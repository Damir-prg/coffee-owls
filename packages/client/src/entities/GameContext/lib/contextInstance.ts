import { createContext } from 'react';
import { TGameContext } from '../types/GameContextTypes';
import { EGAME_MODE_VALUES, EGAME_SCREEN_VALUES } from 'shared/constants/game';

export const GameContextInstance = createContext<TGameContext>({
  gameMode: EGAME_MODE_VALUES.FREE_PLAY,
  setGameMode() {
    console.log('setGameMode');
  },
  gameScreen: EGAME_SCREEN_VALUES.START_GAME,
  setGameScreen() {
    console.log('setGameScreen');
  },
});
GameContextInstance.displayName = 'GameContext';

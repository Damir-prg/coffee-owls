import { useContext } from 'react';
import '../styles/StartGameButton.css';
import { Button } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game/types/ScreensEnum';

export const StartGameButton = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  return (
    <Button
      type="primary"
      size="large"
      className="game__start-button"
      onClick={() => setGameScreen(EGAME_SCREEN_VALUES.TIMER)}>
      НАЧАТЬ ИГРУ
    </Button>
  );
};

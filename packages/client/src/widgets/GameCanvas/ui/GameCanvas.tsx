import { Button } from 'antd';
import '../styles/GameCanvas.css';
import { GameBoard } from './GameBoard';
import { useCallback, useContext, useMemo } from 'react';
import { GameContextInstance } from 'entities/GameContext';
import { EGAME_SCREEN_VALUES, gameModeTranslate } from 'shared/constants/game';

export const GameCanvas = () => {
  const { gameMode, setGameScreen } = useContext(GameContextInstance);

  const selectedGameMode = useMemo(() => gameModeTranslate[gameMode].toLowerCase(), [gameMode]);
  const handleClear = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.END_GAME), [setGameScreen]);

  return (
    <>
      <GameBoard />
      <ul className="game__info">
        <li>Режим: {selectedGameMode}</li>
        <li>Счет: 0</li>
        <li>Лучший счет: 0</li>
        <li>
          <Button size="large" onClick={handleClear}>
            Завершить игру
          </Button>
        </li>
      </ul>
    </>
  );
};

import { Button } from 'antd';
import '../styles/GameCanvas.css';
import { GameBoard } from './GameBoard';
import { useCallback, useContext, useMemo } from 'react';
import { GameContextInstance } from 'entities/GameContext';
import { gameModeTranslate } from 'shared/constants/game';
import { Board } from '../lib/board';

export const GameCanvas = () => {
  const { gameMode } = useContext(GameContextInstance);

  const selectedGameMode = useMemo(() => gameModeTranslate[gameMode].toLowerCase(), [gameMode]);
  const handleClear = useCallback(() => Board.clear(), [Board.isHasInstance]);

  return (
    <>
      <GameBoard />
      <ul className="game__info">
        <li>Режим: {selectedGameMode}</li>
        <li>Счет: 0</li>
        <li>Лучший счет: 0</li>
        <li>
          <Button size="large" onClick={handleClear}>
            Очистить доску
          </Button>
        </li>
      </ul>
    </>
  );
};

import { Button, Statistic } from 'antd';
import '../styles/GameCanvas.css';
import { GameBoard } from './GameBoard';
import { useCallback, useContext, useMemo, useState } from 'react';
import { GameContextInstance } from 'entities/GameContext';
import { EGAME_MODE_VALUES, EGAME_SCREEN_VALUES, gameModeTranslate } from 'shared/constants/game';
import { Board } from '../lib/board';

const { Countdown } = Statistic;

export const GameCanvas = () => {
  const [score, setScore] = useState<number>(0);
  const { gameMode, setGameScreen } = useContext(GameContextInstance);

  const handleScore = useCallback((points: number) => setScore(score => score + points), [setScore]);
  const selectedGameMode = useMemo(() => gameModeTranslate[gameMode].toLowerCase(), [gameMode]);
  const handleClear = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.END_GAME), [setGameScreen]);
  const deadline = useMemo(() => Date.now() + 1000 * 60, []);

  Board.setScoreHandler(handleScore);
  Board.setGameOverHandler(handleClear);

  return (
    <>
      <GameBoard />
      <ul className="game__info">
        <li>Режим: {selectedGameMode}</li>
        {gameMode === EGAME_MODE_VALUES.TIME_LIMIT && (
          <Countdown format="mm:ss" value={deadline} onFinish={handleClear} />
        )}
        <li>Счет: {score}</li>
        <li>Лучший счет: {score}</li>
        <li>
          <Button size="large" onClick={handleClear}>
            Завершить игру
          </Button>
        </li>
      </ul>
    </>
  );
};

import '../styles/GameInfo.css';
import { Alert, Button, List, Typography } from 'antd';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { EGAME_MODE_VALUES, EGAME_SCREEN_VALUES, gameModeTranslate } from 'shared/constants/game';
import { GameContextInstance } from 'entities/GameContext';
import { Board } from '../lib/board';
import { GameTimer } from './GameTimer';
import { useScore } from '../hooks/useScore';
const HINT_TEXT = 'Для перехода в полноэкранный режим нажмите ENTER';

export const GameInfo = () => {
  const { gameMode, setGameScreen } = useContext(GameContextInstance);
  const [score, currentBestScore, handleScore] = useScore(gameMode);

  const selectedGameMode = useMemo(() => gameModeTranslate[gameMode].toLowerCase(), [gameMode]);
  const handleFinishGame = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.END_GAME), [setGameScreen]);

  const dataSource = useMemo(() => {
    if (gameMode === EGAME_MODE_VALUES.FREE_PLAY) {
      return [selectedGameMode, score, currentBestScore];
    }
    return [selectedGameMode, score, currentBestScore, <GameTimer />];
  }, [selectedGameMode, score, currentBestScore, gameMode]);

  const listTitles = useMemo(() => {
    if (gameMode === EGAME_MODE_VALUES.FREE_PLAY) {
      return ['Режим', 'Счет', 'Лучший счет'];
    }
    return ['Режим', 'Счет', 'Лучший счет', 'Время'];
  }, [gameMode]);

  useEffect(() => {
    Board.setScoreHandler(handleScore);
    Board.setGameOverHandler(handleFinishGame);
  }, []);

  return (
    <>
      <List
        size="small"
        header={<Alert message={HINT_TEXT} type="warning" />}
        footer={
          <Button size="large" onClick={handleFinishGame}>
            Завершить игру
          </Button>
        }
        dataSource={dataSource}
        renderItem={(item, index) => (
          <List.Item>
            <Typography.Text strong>{listTitles[index]}:</Typography.Text> {item}
          </List.Item>
        )}
        className="game__info"
      />
    </>
  );
};

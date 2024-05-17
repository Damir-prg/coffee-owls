import { Alert, Button, List, Typography } from 'antd';
import '../styles/GameInfo.css';
import { useCallback, useContext, useMemo } from 'react';
import { GameContextInstance } from 'entities/GameContext';
import { EGAME_SCREEN_VALUES, gameModeTranslate } from 'shared/constants/game';

const HINT_TEXT = 'Для перехода в полноэкранный режим нажмите ENTER';
const LIST_ITEMS_TITLE = ['Режим', 'Счет', 'Лучший счет'];

export const GameInfo = () => {
  const { gameMode, setGameScreen } = useContext(GameContextInstance);

  const selectedGameMode = useMemo(() => gameModeTranslate[gameMode].toLowerCase(), [gameMode]);

  const handleFinishGame = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.END_GAME), [setGameScreen]);

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
        dataSource={[selectedGameMode, 0, 0]}
        renderItem={(item, index) => (
          <List.Item>
            <Typography.Text strong>{LIST_ITEMS_TITLE[index]}:</Typography.Text> {item}
          </List.Item>
        )}
        className="game__info"
      />
    </>
  );
};

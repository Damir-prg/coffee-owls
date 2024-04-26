import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { ChangeGameMode } from 'features/StartGameFields';
import { useContext } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import '../styles/StartGameForm.css';

export const StartGameForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  return (
    <Flex vertical align="center" justify="center" gap={32}>
      <ChangeGameMode />
      <Button className="zero-border-radius" size="large" icon={<SearchOutlined />}>
        Управление
      </Button>
      <Button
        type="primary"
        size="large"
        className="game__start-button"
        onClick={() => setGameScreen(EGAME_SCREEN_VALUES.TIMER)}>
        НАЧАТЬ ИГРУ
      </Button>
    </Flex>
  );
};

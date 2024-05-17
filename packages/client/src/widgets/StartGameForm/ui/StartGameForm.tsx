import { SettingOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { ChangeGameMode } from 'features/StartGameFields';
import { useContext } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import '../styles/StartGameForm.css';
import { GameContentContainer } from 'entities/GameContentContainer';

export const StartGameForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  return (
    <GameContentContainer>
      <Flex vertical align="center" justify="center" gap={32}>
        <ChangeGameMode />
        <Button className="game__start-button" size="large" icon={<SettingOutlined />}>
          Настройки управления
        </Button>
        <Button
          type="primary"
          size="large"
          className="game__start-button"
          onClick={() => setGameScreen(EGAME_SCREEN_VALUES.TIMER)}>
          НАЧАТЬ ИГРУ
        </Button>
      </Flex>
    </GameContentContainer>
  );
};

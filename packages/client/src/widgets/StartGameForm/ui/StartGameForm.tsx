import { SettingOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { ChangeGameMode } from 'features/StartGameFields';
import { useCallback, useContext } from 'react';
import { EGAME_MODE_VALUES, EGAME_SCREEN_VALUES } from 'shared/constants/game';
import '../styles/StartGameForm.css';
import { GameContentContainer } from 'entities/GameContentContainer';

export const StartGameForm = () => {
  const { setGameScreen, gameMode } = useContext(GameContextInstance);

  const changeScreen = useCallback(() => {
    const screen = gameMode === EGAME_MODE_VALUES.FREE_PLAY ? EGAME_SCREEN_VALUES.GAME : EGAME_SCREEN_VALUES.TIMER;
    return setGameScreen(screen);
  }, [gameMode, setGameScreen]);

  return (
    <GameContentContainer>
      <Flex vertical align="center" justify="center" gap={32}>
        <ChangeGameMode />
        <Button className="game__start-button" size="large" icon={<SettingOutlined />}>
          Настройки управление
        </Button>
        <Button type="primary" size="large" className="game__start-button" onClick={changeScreen}>
          НАЧАТЬ ИГРУ
        </Button>
      </Flex>
    </GameContentContainer>
  );
};

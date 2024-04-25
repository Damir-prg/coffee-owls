import { Flex } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { ChangeGameMode, SettingsButton, StartGameButton } from 'features/StartGameFields';
import { useContext, useEffect } from 'react';

export const StartGameForm = () => {
  const { gameScreen } = useContext(GameContextInstance);

  useEffect(() => {
    console.log(gameScreen);
  }, [gameScreen]);

  return (
    <Flex vertical align="center" justify="center" gap={32}>
      <ChangeGameMode />
      <SettingsButton />
      <StartGameButton />
    </Flex>
  );
};

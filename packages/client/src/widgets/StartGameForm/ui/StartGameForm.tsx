import { Flex } from 'antd';
import { ChangeGameMode, SettingsButton, StartGameButton } from 'features/StartGameFields';

export const StartGameForm = () => {
  return (
    <Flex vertical align="center" justify="center" gap={32}>
      <ChangeGameMode />
      <SettingsButton />
      <StartGameButton />
    </Flex>
  );
};

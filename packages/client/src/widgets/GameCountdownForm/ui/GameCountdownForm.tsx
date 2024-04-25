import { Flex, Typography } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useContext } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { useTimer } from 'shared/hooks';

const { Text, Title } = Typography;

export const GameCountdownForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);
  const time = useTimer(7, () => setGameScreen(EGAME_SCREEN_VALUES.START_GAME));

  return (
    <Flex vertical align="center" justify="center" gap={16}>
      <Title level={5} className="title__primary">
        Игра начнётся через:
      </Title>
      <Text className="numeric-font title__primary">{time}</Text>
    </Flex>
  );
};

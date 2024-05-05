import { Flex, Typography, Statistic } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useCallback, useContext } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';

const { Countdown } = Statistic;
const { Title } = Typography;

export const GameCountdownForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  const deadline = Date.now() + 1000 * 7;

  const handleEndTimer = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.GAME), []);

  return (
    <Flex vertical align="center" justify="center" gap={16}>
      <Title level={4} className="title__primary">
        Игра начнётся через:
      </Title>
      <Countdown format="mm:ss" value={deadline} onFinish={handleEndTimer} className="numeric-font title__primary" />
    </Flex>
  );
};

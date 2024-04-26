import { Flex, Typography, Statistic } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useContext } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';

const { Countdown } = Statistic;
const { Title } = Typography;

export const GameCountdownForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  const deadline = Date.now() + 1000 * 7;

  return (
    <Flex vertical align="center" justify="center" gap={16}>
      <Title level={4} className="title__primary">
        Игра начнётся через:
      </Title>
      <Countdown
        format="mm:ss"
        value={deadline}
        onFinish={() => setGameScreen(EGAME_SCREEN_VALUES.START_GAME)}
        className="numeric-font title__primary"
      />
    </Flex>
  );
};

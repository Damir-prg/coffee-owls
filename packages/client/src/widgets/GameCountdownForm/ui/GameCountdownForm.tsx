import { Flex, Typography } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useContext } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { useTimer } from 'shared/hooks';

const { Title } = Typography;

export const GameCountdownForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);
  const time = useTimer(7, () => setGameScreen(EGAME_SCREEN_VALUES.START_GAME));

  return (
    <Flex vertical align="center" justify="center" gap={16}>
      <Title level={4} className="title__primary">
        Игра начнётся через:
      </Title>
      <Title level={5} className="numeric-font title__primary">
        {time}
      </Title>
    </Flex>
  );
};

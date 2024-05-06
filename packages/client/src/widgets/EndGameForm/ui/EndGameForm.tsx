import { Button, Flex, Typography } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useCallback, useContext } from 'react';
import EROUTES from 'shared/RoutesEnum';
import Link from 'shared/components/Link/Link';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';

const { Title, Text } = Typography;

export const EndGameForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  const handleStartNewGame = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.GAME), []);

  return (
    <Flex vertical align="center" justify="center" gap={24}>
      <Flex vertical align="center" justify="flex-start">
        <Title level={3} className="title__primary">
          Спасибо за игру!
        </Title>
        <Text className="text__center-align">К сожалению, больше нет ходов</Text>
      </Flex>
      <Flex vertical align="center" justify="center" gap={8}>
        <Text className="text__center-align">
          Вы можете ознакомиться с
          <br />
          <Link path={EROUTES.RATING} text="рейтингом&nbsp;участников" size="large" weight="normal" />
          <br />
          или
        </Text>
        <Button type="primary" size="large" className="full-width" onClick={handleStartNewGame}>
          Повторить игру
        </Button>
        <Link path={EROUTES.HOME} text="Вернуться на главную страницу" size="small" weight="lighter" />
      </Flex>
    </Flex>
  );
};

import { Button, Flex, Typography } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import EROUTES from 'shared/RoutesEnum';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';

const { Title, Text } = Typography;

export const EndGameForm = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  const handleStartNewGame = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.START_GAME), []);

  return (
    <Flex vertical align="center" justify="center" gap={24}>
      <Flex vertical align="center" justify="flex-start">
        <Title level={5} className="title__primary">
          Спасибо за игру!
        </Title>
        <Text className="text__center-align">К сожалению, больше нет ходов</Text>
      </Flex>
      <Flex vertical align="center" justify="center" gap={8}>
        <Text className="text__center-align">
          Вы можете ознакомиться с{' '}
          <Link to={`/${EROUTES.RATING}`} relative="route">
            <Text className="title__primary">рейтингом&nbsp;участников</Text>
          </Link>
          <br />
          или
        </Text>
        <Button type="primary" size="large" className="full-width" onClick={handleStartNewGame}>
          Повторить игру
        </Button>
        <Link to={`/${EROUTES.HOME}`}>
          <Text className="title__primary">Вернуться на главную страницу</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

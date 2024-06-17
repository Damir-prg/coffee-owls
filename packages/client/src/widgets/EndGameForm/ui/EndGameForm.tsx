import { Button, Flex, Typography } from 'antd';
import { GameContentContainer } from 'entities/GameContentContainer';
import { GameContextInstance } from 'entities/GameContext';
import { useCallback, useContext, useEffect } from 'react';
import EROUTES from 'shared/lib/RoutesEnum';
import Link from 'shared/components/Link/Link';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { useFinishGame } from '../hooks/useFinishGame';

const { Title, Text } = Typography;

export const EndGameForm = () => {
  const { setGameScreen, gameMode } = useContext(GameContextInstance);
  const [finishGame] = useFinishGame(gameMode);

  const handleStartNewGame = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.START_GAME), []);

  useEffect(() => {
    finishGame();
  }, []);

  return (
    <GameContentContainer>
      <Flex vertical align="center" justify="center" gap={40}>
        <Flex vertical align="center" justify="flex-start" gap={12}>
          <Title level={3} className="title__primary">
            Спасибо за игру!
          </Title>
          <Text className="text__center-align">К сожалению, больше нет ходов</Text>
        </Flex>
        <Flex vertical align="center" justify="center" gap={12} className="full-width">
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
    </GameContentContainer>
  );
};

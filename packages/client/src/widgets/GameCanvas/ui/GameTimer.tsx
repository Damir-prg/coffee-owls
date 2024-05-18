import { Statistic } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useCallback, useContext, useMemo } from 'react';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';

const { Countdown } = Statistic;

export const GameTimer = () => {
  const { setGameScreen } = useContext(GameContextInstance);

  const handleFinishGame = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.END_GAME), [setGameScreen]);
  const deadline = useMemo(() => Date.now() + 1000 * 60, []);

  return <Countdown format="mm:ss" value={deadline} onFinish={handleFinishGame} className="numeric-font" />;
};

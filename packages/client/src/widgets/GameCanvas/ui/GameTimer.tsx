import { Statistic } from 'antd';
import { GameContextInstance } from 'entities/GameContext';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game';
import { setTime as setStoreTime } from 'shared/store/board/boardSlice';

const { Countdown } = Statistic;

export const GameTimer = () => {
  const { setGameScreen } = useContext(GameContextInstance);
  const [time, setTime] = useState<number>(0);
  const dispatch = useDispatch();

  const handleFinishGame = useCallback(() => setGameScreen(EGAME_SCREEN_VALUES.END_GAME), [setGameScreen]);
  const deadline = useMemo(() => Date.now() + 1000 * 60, []);

  useEffect(() => {
    if (!time) {
      dispatch(setStoreTime('00:00'));
    }

    return () => {
      const strTime = time.toString();
      dispatch(setStoreTime(`00:${strTime.slice(0, 2)}`));
    };
  }, [time]);

  return (
    <Countdown
      format="mm:ss"
      value={deadline}
      onChange={value => {
        setTime(value as number);
      }}
      onFinish={handleFinishGame}
      className="numeric-font"
    />
  );
};

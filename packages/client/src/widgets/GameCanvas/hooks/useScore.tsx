import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EGAME_MODE_VALUES } from 'shared/constants/game';
import { TRootState } from 'shared/store/store';
import { setScore as setStoreScore } from 'shared/store/board/boardSlice';

export const useScore = (gameMode: EGAME_MODE_VALUES) => {
  const [score, setScore] = useState<number>(0);
  const storeScore = useSelector((state: TRootState) => state.board.score);
  const dispatch = useDispatch();

  const currentBestScore = useMemo((): number => {
    if (gameMode === EGAME_MODE_VALUES.FREE_PLAY) {
      return storeScore.free;
    }
    return storeScore.time;
  }, [gameMode, storeScore.free, storeScore.time]);

  const handleScore = useCallback(
    (points: number) =>
      setScore((score: number) => {
        const currentScore = score + points;
        if (currentScore && currentScore > currentBestScore) {
          if (gameMode === EGAME_MODE_VALUES.FREE_PLAY) {
            dispatch(setStoreScore({ free: currentScore, time: storeScore.time }));
          } else {
            dispatch(setStoreScore({ free: storeScore.free, time: currentScore }));
          }
        }
        return currentScore;
      }),
    [setScore, currentBestScore, gameMode],
  );

  return { score, currentBestScore, handleScore } as const;
};

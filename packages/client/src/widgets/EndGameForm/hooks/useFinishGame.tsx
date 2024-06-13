import { useSelector } from 'react-redux';
import { EGAME_MODE_VALUES } from 'shared/constants/game';
import { TRootState } from 'shared/store/store';
import { leaderBoardApiAdd } from 'shared/api/leaderBoardApi/leaderBoardApi';
import { useCallback } from 'react';
import { EGAME_MODE } from 'shared/api/leaderBoardApi/leaderBoard.interface';

export const useFinishGame = (gameMode: EGAME_MODE_VALUES) => {
  const storeBoard = useSelector((state: TRootState) => state.board);
  const storeUser = useSelector((state: TRootState) => state.user.userData);

  const finishGame = useCallback(() => {
    if (gameMode === EGAME_MODE_VALUES.FREE_PLAY) {
      return leaderBoardApiAdd(EGAME_MODE.FREE, {
        id: storeUser?.id,
        username: storeUser?.display_name,
        score: storeBoard.score.free,
        avatar: storeUser?.avatar,
      });
    }

    return leaderBoardApiAdd(EGAME_MODE.TIME, {
      id: storeUser?.id,
      username: storeUser?.display_name,
      score: storeBoard.score.time,
      avatar: storeUser?.avatar,
      time: storeBoard.time,
    });
  }, [storeBoard, storeUser, gameMode]);

  return [finishGame] as const;
};

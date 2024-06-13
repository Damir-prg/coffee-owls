import { useSelector } from 'react-redux';
import { EGAME_MODE_VALUES } from 'shared/constants/game';
import { TRootState } from 'shared/store/store';

export const useFinishGame = (gameMode: EGAME_MODE_VALUES) => {
  const storeBoard = useSelector((state: TRootState) => state.board);
  const storeUser = useSelector((state: TRootState) => state.user);

  const finishGame = () => {
    console.log(storeBoard, storeUser, gameMode);
  };

  return [finishGame] as const;
};

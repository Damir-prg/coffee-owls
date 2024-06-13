import { EGAME_MODE } from 'shared/api/leaderBoardApi/leaderBoard.interface';

export interface IBoardState {
  time: string;
  score: Record<EGAME_MODE, number>;
}

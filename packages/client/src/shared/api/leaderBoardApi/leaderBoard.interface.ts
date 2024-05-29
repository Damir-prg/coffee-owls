export enum EGAME_MODE {
  FREE = 'free',
  TIME = 'time',
}

export interface ILeaderBoardData {
  id: string;
  username: string;

  avatar?: string;

  /** Количество набранных очков */
  score: number;

  /** Режим игры */
  gameType: EGAME_MODE;

  // TODO format
  time: string;
}

export type TRatingFieldName = 'score' | 'time';

export interface ILeaderBoardResponse {
  data: ILeaderBoardData;
  ratingFieldName: TRatingFieldName;
}

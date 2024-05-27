export enum EGAME_MODE {
  FREE = 'free',
  TIME = 'time',
}

export interface ILeaderBoardData {
  username: string;

  avatar?: string;

  /** Количество набранных очков */
  score: number;

  /** Режим игры */
  gameType: EGAME_MODE;

  // TODO format
  time?: string;
}

export interface ILeaderBoardResponse {
  data: ILeaderBoardData;
  ratingFieldName: 'score' | 'time';
}

export type TRatingFieldName = 'score' | 'time';

export enum EGAME_MODE {
  FREE = 'free',
  TIME = 'time',
}

export interface ILeaderBoardData {
  id: string;
  username: string;
  score: number;
  avatar?: string;
  time?: string;
}

export interface ILeaderBoardGetResponse {
  data: ILeaderBoardData;
}

export interface ILeaderBoardGetRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface ILeaderBoardAddRequest {
  data: ILeaderBoardData;
  ratingFieldName: string;
  teamName: string;
}

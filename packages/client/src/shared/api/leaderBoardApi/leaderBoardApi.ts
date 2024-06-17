import {
  EGAME_MODE,
  ILeaderBoardGetRequest,
  ILeaderBoardGetResponse,
  ILeaderBoardData,
  ILeaderBoardAddRequest,
} from './leaderBoard.interface';
import api from '../api';

const leaderBoardUrl = '/leaderboard';

export const leaderBoardApiGet = (
  type: EGAME_MODE,
  cursor?: number,
  limit?: number,
): Promise<Array<ILeaderBoardGetResponse> | null> => {
  const teamName = 'coffeeowls' + type;
  const data: ILeaderBoardGetRequest = {
    cursor: cursor || 0,
    limit: limit || 10,
    ratingFieldName: 'score',
  };

  return api.post(`${leaderBoardUrl}/${teamName}`, { data });
};

export const leaderBoardApiAdd = (type: EGAME_MODE, data: ILeaderBoardData) => {
  const teamName = 'coffeeowls' + type;
  const dataRequest: ILeaderBoardAddRequest = {
    data,
    ratingFieldName: 'score',
    teamName,
  };

  return api.post(`${leaderBoardUrl}`, { data: dataRequest });
};

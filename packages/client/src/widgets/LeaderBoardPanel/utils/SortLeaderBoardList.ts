import { EGAME_MODE, ILeaderBoardGetResponse } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { SortByField } from 'widgets/LeaderBoardPanel/utils/SortByField';
import { RATING_FIELD_NAME } from 'widgets/LeaderBoardPanel/types/LeaderBoardPanel.types';

export interface ISortLeaderBoardList {
  ASC: Array<ILeaderBoardGetResponse>;
  DESC: Array<ILeaderBoardGetResponse>;
}
export function sortLeaderBoardList(data: Array<ILeaderBoardGetResponse>, type: EGAME_MODE): ISortLeaderBoardList {
  if (!data.length) {
    return {
      ASC: [],
      DESC: [],
    };
  }
  return {
    ASC: SortByField({
      data: data,
      sortDirection: 'ASC',
      ratingFieldName: RATING_FIELD_NAME[type],
    }),
    DESC: SortByField({
      data: data ?? [],
      sortDirection: 'DESC',
      ratingFieldName: RATING_FIELD_NAME[type],
    }),
  };
}

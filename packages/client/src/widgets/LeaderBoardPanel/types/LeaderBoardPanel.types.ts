import { EGAME_MODE, TRatingFieldName } from 'shared/api/leaderBoardApi/leaderBoard.interface';

export type TSortDirection = 'ASC' | 'DESC';

export const RATING_FIELD_NAME: Record<EGAME_MODE, TRatingFieldName> = {
  [EGAME_MODE.FREE]: 'score',
  [EGAME_MODE.TIME]: 'time',
};

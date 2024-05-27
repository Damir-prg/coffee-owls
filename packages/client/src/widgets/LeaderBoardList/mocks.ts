import { EGAME_MODE, ILeaderBoardResponse } from 'shared/api/leaderBoardApi/leaderBoard.interface';

export const LEADER_BOARD_DATA_SCORE: ReadonlyArray<ILeaderBoardResponse> = [
  {
    data: {
      username: 'Alex',
      score: 100,
      gameType: EGAME_MODE.FREE,
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      username: 'Alex2',
      score: 1000,
      gameType: EGAME_MODE.FREE,
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      username: 'Alex3',
      score: 50,
      gameType: EGAME_MODE.FREE,
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      username: 'Alex4',
      score: 160,
      gameType: EGAME_MODE.FREE,
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      username: 'Alex5',
      score: 3000,
      gameType: EGAME_MODE.FREE,
    },
    ratingFieldName: 'score',
  },
];

export const LEADER_BOARD_DATA_TIME: ReadonlyArray<ILeaderBoardResponse> = [
  {
    data: {
      username: 'Fred',
      score: 300,
      gameType: EGAME_MODE.TIME,
      time: '01:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred2',
      score: 30,
      gameType: EGAME_MODE.TIME,
      time: '00:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred3',
      score: 800,
      gameType: EGAME_MODE.TIME,
      time: '00:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred4',
      score: 5000,
      gameType: EGAME_MODE.TIME,
      time: '07:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred5',
      score: 3000,
      gameType: EGAME_MODE.TIME,
      time: '02:10',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred',
      score: 300,
      gameType: EGAME_MODE.TIME,
      time: '01:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred2',
      score: 30,
      gameType: EGAME_MODE.TIME,
      time: '00:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred3',
      score: 800,
      gameType: EGAME_MODE.TIME,
      time: '00:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      username: 'Fred4',
      score: 5000,
      gameType: EGAME_MODE.TIME,
      time: '07:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
];

export const TEST_LEADER_BOARD_DATA: Record<EGAME_MODE, ReadonlyArray<ILeaderBoardResponse>> = {
  [EGAME_MODE.FREE]: LEADER_BOARD_DATA_SCORE,
  [EGAME_MODE.TIME]: LEADER_BOARD_DATA_TIME,
};

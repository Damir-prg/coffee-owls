import { EGAME_MODE, ILeaderBoardResponse } from 'shared/api/leaderBoardApi/leaderBoard.interface';

export const LEADER_BOARD_DATA_SCORE: Array<ILeaderBoardResponse> = [
  {
    data: {
      id: '1',
      username: 'Alex',
      score: 100,
      gameType: EGAME_MODE.FREE,
      time: '00:12',
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      id: '2',
      username: 'Alex2',
      score: 1000,
      gameType: EGAME_MODE.FREE,
      time: '00:12',
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      id: '3',
      username: 'Alex3',
      score: 50,
      gameType: EGAME_MODE.FREE,
      time: '01:30',
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      id: '4',
      username: 'Alex4',
      score: 90,
      gameType: EGAME_MODE.FREE,
      time: '01:30',
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      id: '5',
      username: 'Alex5',
      score: 340,
      gameType: EGAME_MODE.FREE,
      time: '01:30',
    },
    ratingFieldName: 'score',
  },
  {
    data: {
      id: '6',
      username: 'Alex6',
      score: 550,
      gameType: EGAME_MODE.FREE,
      time: '01:30',
    },
    ratingFieldName: 'score',
  },
];

export const LEADER_BOARD_DATA_TIME: ReadonlyArray<ILeaderBoardResponse> = [
  {
    data: {
      id: '1',
      username: 'Fred',
      score: 300,
      gameType: EGAME_MODE.TIME,
      time: '01:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      id: '2',
      username: 'Fred2',
      score: 30,
      gameType: EGAME_MODE.TIME,
      time: '00:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      id: '3',
      username: 'Fred3',
      score: 800,
      gameType: EGAME_MODE.TIME,
      time: '00:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      id: '4',
      username: 'Fred4',
      score: 800,
      gameType: EGAME_MODE.TIME,
      time: '02:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      id: '5',
      username: 'Fred5',
      score: 800,
      gameType: EGAME_MODE.TIME,
      time: '10:30',
    },
    ratingFieldName: EGAME_MODE.TIME,
  },
  {
    data: {
      id: '6',
      username: 'Fred6',
      score: 800,
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

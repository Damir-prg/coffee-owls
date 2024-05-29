import React, { FC, useCallback, useRef, useState } from 'react';
import { EGAME_MODE, ILeaderBoardResponse } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { Empty, Flex } from 'antd';
import '../styles/LeaderBoardPanel.css';
import { LeaderBoardHonorPreview } from 'widgets/LeaderBoardHonorPreview';
import { TEST_LEADER_BOARD_DATA } from 'widgets/LeaderBoardList/mocks';
import { RATING_FIELD_NAME, TSortDirection } from 'widgets/LeaderBoardPanel/types/LeaderBoardPanel.types';
import { SortByField } from 'widgets/LeaderBoardPanel/utils/SortByField';
import { LeaderBoardList } from 'widgets/LeaderBoardList';

export const LeaderBoardPanel: FC<{
  type: EGAME_MODE;
}> = ({ type }) => {
  const data = TEST_LEADER_BOARD_DATA[type];

  const [sortDirection, updateSortDirection] = useState<TSortDirection>(type === EGAME_MODE.TIME ? 'ASC' : 'DESC');
  const sortedData = useRef<Record<TSortDirection, Array<ILeaderBoardResponse>>>({
    ASC: SortByField({
      data,
      sortDirection: 'ASC',
      ratingFieldName: RATING_FIELD_NAME[type],
    }),
    DESC: SortByField({
      data,
      sortDirection: 'DESC',
      ratingFieldName: RATING_FIELD_NAME[type],
    }),
  });

  const handleFilterClick = useCallback(
    (direction: TSortDirection) => {
      if (sortDirection === direction) {
        return;
      }
      updateSortDirection(direction);
    },
    [sortDirection, updateSortDirection],
  );

  if (!data || !data.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Рейтинг пуст" />;
  }

  return (
    <Flex gap={8} vertical className="leaderboard-wrapper">
      <LeaderBoardHonorPreview data={sortedData.current[sortDirection]} />
      <LeaderBoardList data={sortedData.current[sortDirection]} filterOnClick={handleFilterClick} />
    </Flex>
  );
};

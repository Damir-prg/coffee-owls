import React, { FC, useCallback, useState } from 'react';
import { EGAME_MODE } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { Empty, Flex, Spin } from 'antd';
import '../styles/LeaderBoardPanel.css';
import { LeaderBoardHonorPreview } from 'widgets/LeaderBoardHonorPreview';
import { TSortDirection } from 'widgets/LeaderBoardPanel/types/LeaderBoardPanel.types';
import { LeaderBoardList } from 'widgets/LeaderBoardList';
import { useLeaderBoardData } from '../hooks/useLeaderBoardData';
import { sortLeaderBoardList } from 'widgets/LeaderBoardPanel/utils/SortLeaderBoardList';

export const LeaderBoardPanel: FC<{
  type: EGAME_MODE;
}> = ({ type }) => {
  const [data, pending, error] = useLeaderBoardData(type);
  const [sortDirection, updateSortDirection] = useState<TSortDirection>(type === 'time' ? 'ASC' : 'DESC');

  const handleFilterClick = useCallback(
    (direction: TSortDirection) => {
      if (sortDirection === direction) {
        return;
      }
      updateSortDirection(direction);
    },
    [sortDirection, updateSortDirection],
  );

  if (error) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error} />;
  }

  if (pending) {
    return <Empty image={<Spin />} description="Загрузка рейтинга" />;
  }

  if (!data || !data.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Рейтинг пуст" />;
  }

  const sortedData = sortLeaderBoardList(data, type);
  return (
    <Flex gap={8} vertical className="leaderboard-wrapper">
      <LeaderBoardHonorPreview data={sortedData[sortDirection]} />
      <LeaderBoardList data={sortedData[sortDirection]} filterOnClick={handleFilterClick} />
    </Flex>
  );
};

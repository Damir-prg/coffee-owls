import React, { FC, useCallback, useRef, useState } from 'react';
import { ILeaderBoardGetResponse, EGAME_MODE } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { Empty, Flex, Spin } from 'antd';
import '../styles/LeaderBoardPanel.css';
import { LeaderBoardHonorPreview } from 'widgets/LeaderBoardHonorPreview';
import { RATING_FIELD_NAME, TSortDirection } from 'widgets/LeaderBoardPanel/types/LeaderBoardPanel.types';
import { SortByField } from 'widgets/LeaderBoardPanel/utils/SortByField';
import { LeaderBoardList } from 'widgets/LeaderBoardList';
import { useLeaderBoardData } from '../hooks/useLeaderBoardData';

export const LeaderBoardPanel: FC<{
  type: EGAME_MODE;
}> = ({ type }) => {
  const [data, pending, error] = useLeaderBoardData(type);
  const [sortDirection, updateSortDirection] = useState<TSortDirection>(type === 'time' ? 'ASC' : 'DESC');
  const sortedData = useRef<Record<TSortDirection, Array<ILeaderBoardGetResponse>>>({
    ASC: SortByField({
      data: data ?? [],
      sortDirection: 'ASC',
      ratingFieldName: RATING_FIELD_NAME[type],
    }),
    DESC: SortByField({
      data: data ?? [],
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

  if (error) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error} />;
  }

  if (pending) {
    return <Empty image={<Spin />} description="Загрузка рейтинга" />;
  }

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

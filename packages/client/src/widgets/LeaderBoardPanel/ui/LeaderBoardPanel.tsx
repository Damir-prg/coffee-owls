import { FC, useCallback, useState, createContext } from 'react';
import { EGAME_MODE } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { Button, Flex } from 'antd';
import { LeaderBoardList } from 'widgets/LeaderBoardList';
import '../styles/LeaderBoardPanel.css';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { LeaderBoardHonorPreview } from 'widgets/LeaderBoardHonorPreview';

type TSortDirection = 'ASC' | 'DESC';
export const LeaderBoardContext = createContext<{
  type: EGAME_MODE;
  sortDirection: TSortDirection;
}>({
  type: EGAME_MODE.FREE,
  sortDirection: 'DESC',
});
export const LeaderBoardPanel: FC<{
  type: EGAME_MODE;
}> = ({ type }) => {
  const [sortDirection, updateSortDirection] = useState<TSortDirection>('DESC');

  const handleFilterClick = useCallback(
    (direction: TSortDirection) => {
      if (sortDirection === direction) {
        return;
      }
      updateSortDirection(direction);
    },
    [sortDirection, updateSortDirection],
  );

  return (
    <Flex gap={8} vertical className="leaderboard-wrapper">
      <LeaderBoardContext.Provider
        value={{
          type,
          sortDirection,
        }}>
        <Flex className="leaderboard-content-wrapper" vertical>
          <LeaderBoardHonorPreview />
          <Flex vertical={false} justify="flex-end" gap={8}>
            <Button icon={<UpOutlined />} onClick={() => handleFilterClick('ASC')} />
            <Button icon={<DownOutlined />} onClick={() => handleFilterClick('DESC')} />
          </Flex>
        </Flex>
        <LeaderBoardList />
      </LeaderBoardContext.Provider>
    </Flex>
  );
};

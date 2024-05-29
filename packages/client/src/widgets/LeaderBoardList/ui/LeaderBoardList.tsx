import { FC } from 'react';
import { Button, Empty, Flex, List } from 'antd';
import '../styles/LeaderBoardList.css';
import { LeaderBoardListItem } from 'widgets/LeaderBoardList/ui/LeaderBoardListItem';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ILeaderBoardResponse } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { TSortDirection } from 'widgets/LeaderBoardPanel/types/LeaderBoardPanel.types';

export const LeaderBoardList: FC<{
  data: Array<ILeaderBoardResponse>;
  filterOnClick: (direction: TSortDirection) => void;
}> = ({ data, filterOnClick }) => {
  if (data.length < 4) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Рейтинг пуст" />;
  }
  const listData = data.slice(3);
  return (
    <>
      <Flex vertical={false} justify="flex-end" gap={8}>
        <Button icon={<UpOutlined />} onClick={() => filterOnClick('ASC')} />
        <Button icon={<DownOutlined />} onClick={() => filterOnClick('DESC')} />
      </Flex>
      <List split={false} size="small" className="leaderboard-list">
        {listData.map((item, index) => {
          return <LeaderBoardListItem data={item.data} index={index + 3} key={index} />;
        })}
      </List>
    </>
  );
};

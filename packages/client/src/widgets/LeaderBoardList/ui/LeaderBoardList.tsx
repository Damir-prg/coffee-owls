import { FC, useContext } from 'react';
import { List } from 'antd';
import { TEST_LEADER_BOARD_DATA } from 'widgets/LeaderBoardList/mocks';
import '../styles/LeaderBoardList.css';
import { LeaderBoardListItem } from 'widgets/LeaderBoardList/ui/LeaderBoardListItem';
import { LeaderBoardContext } from 'widgets/LeaderBoardPanel/ui/LeaderBoardPanel';

export const LeaderBoardList: FC = () => {
  const { type, sortDirection } = useContext(LeaderBoardContext);
  console.log(sortDirection);
  /**
   * Предполагаю, что первоначальная сортировка будет происходить в контроллере при запросе на бэк
   *  */
  const data = TEST_LEADER_BOARD_DATA[type];
  if (!data || !data.length || data.length < 4) {
    return null;
  }

  // TODO сортировка
  const listData = data.slice(3);
  return (
    <List split={false} size="small" className="leaderboard-list">
      {listData.map((item, index) => {
        return <LeaderBoardListItem data={item.data} index={index + 3} key={index} />;
      })}
    </List>
  );
};

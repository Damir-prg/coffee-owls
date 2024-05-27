import { Flex, Tabs, Typography } from 'antd';
import React from 'react';
import { TrophyOutlined } from '@ant-design/icons';
import { EGAME_MODE } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { LeaderBoardPanel } from 'widgets/LeaderBoardPanel';
import './LeaderBoard.css';
const { Title } = Typography;

const TABS = [
  {
    key: EGAME_MODE.FREE,
    label: 'В своё удовольствие',
    children: <LeaderBoardPanel type={EGAME_MODE.FREE} />,
  },
  {
    key: EGAME_MODE.TIME,
    label: 'На время',
    children: <LeaderBoardPanel type={EGAME_MODE.TIME} />,
  },
];

function LeaderBoard() {
  /**
   * Заголовок просто выровнен относительно основного списка
   * gap 264px:
   * 32px - основное расстояние между заголовком и началом списка
   * 232px - сдвиг заголовка относительно табов контента с фильтрами и аватарами
   * */
  return (
    <Flex gap={264} vertical align="center">
      <Title
        className="title__primary"
        style={{
          marginLeft: 346,
        }}>
        <Flex gap={16} vertical={false}>
          <TrophyOutlined size={46} />
          Рейтинг Игроков
          <TrophyOutlined size={46} />
        </Flex>
      </Title>
      <Tabs items={TABS} defaultActiveKey="free" tabPosition="left" />
    </Flex>
  );
}

export default LeaderBoard;

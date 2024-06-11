import { Flex, Tabs, Typography } from 'antd';
import React from 'react';
import { TrophyOutlined } from '@ant-design/icons';
import { EGAME_MODE } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { LeaderBoardPanel } from 'widgets/LeaderBoardPanel';
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

const LeaderBoard = () => {
  return (
    <Flex gap={32} vertical align="center">
      <Title className="title__primary">
        <Flex gap={16} vertical={false}>
          <TrophyOutlined size={46} />
          Рейтинг Игроков
          <TrophyOutlined size={46} />
        </Flex>
      </Title>
      <Tabs items={TABS} defaultActiveKey="free" />
    </Flex>
  );
};

export const initLeaderBoardPage = () => Promise.resolve();

export default LeaderBoard;

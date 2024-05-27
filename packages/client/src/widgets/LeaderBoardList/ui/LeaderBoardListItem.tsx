import { ILeaderBoardData } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import React, { FC } from 'react';
import { Avatar, Flex, List } from 'antd';
import { Typography } from 'antd';
import '../styles/LeaderBoardList.css';
import { UserOutlined } from '@ant-design/icons';
import { BaseUrlApi } from 'shared/config/config';

const { Text } = Typography;
export const LeaderBoardListItem: FC<{ data: ILeaderBoardData; index: number }> = ({ data, index }) => {
  const { username, avatar, score, time } = data;

  return (
    <List.Item className="leaderboard-list-item">
      <Text strong className="text__primary">
        #{index + 1}
      </Text>
      <List.Item.Meta title={username} avatar={<AvatarItem avatar={avatar} />} />
      <Flex gap={16} vertical={false}>
        <InfoBlock title="Время" value={time} />
        <InfoBlock title="Очки" value={score.toString()} />
      </Flex>
    </List.Item>
  );
};

const AvatarItem: FC<{ avatar?: string }> = ({ avatar }) => {
  const url = avatar ? `${BaseUrlApi}/resources/${avatar}` : '';
  return <Avatar src={url} icon={<UserOutlined />} size={54} className="leaderboard-list-avatar" />;
};

const InfoBlock: FC<{
  title: string;
  value?: string;
}> = ({ title, value }) => {
  if (!value) {
    return null;
  }
  return (
    <Flex vertical align="center">
      <Text className="text__primary">{title}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

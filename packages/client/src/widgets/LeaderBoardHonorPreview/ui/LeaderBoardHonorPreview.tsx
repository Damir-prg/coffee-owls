import React, { FC, useContext } from 'react';
import { Avatar, Badge, Flex, Typography } from 'antd';
import { LeaderBoardContext } from 'widgets/LeaderBoardPanel/ui/LeaderBoardPanel';
import { TEST_LEADER_BOARD_DATA } from 'widgets/LeaderBoardList/mocks';
import { ILeaderBoardData } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import {
  AVATAR_HONOR_PREVIEW_SIZE,
  EHONOR_PREVIEW_PLACE,
  HONOR_CARD_COLOR_BADGE,
  HONOR_CARD_MARGIN,
} from 'widgets/LeaderBoardHonorPreview/types/LeaderBoardHonorPreview.types';
import { BaseUrlApi } from 'shared/config/config';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const LeaderBoardHonorPreview: FC = () => {
  const { type } = useContext(LeaderBoardContext);
  const data = TEST_LEADER_BOARD_DATA[type];

  if (!data || !data.length) {
    return null;
  }

  return (
    <Flex gap={8} justify="center">
      <HonorCard data={data[1]?.data ?? null} place={2} />
      <HonorCard data={data[0]?.data ?? null} place={1} />
      <HonorCard data={data[2]?.data ?? null} place={3} />
    </Flex>
  );
};

const HonorCard: FC<{
  data: ILeaderBoardData | null;
  place: EHONOR_PREVIEW_PLACE;
}> = ({ data, place }) => {
  if (!data) {
    return null;
  }

  const { username, avatar, score, time } = data;

  const url = avatar ? `${BaseUrlApi}/resources/${avatar}` : '';
  const size = AVATAR_HONOR_PREVIEW_SIZE[place];

  return (
    <Flex
      vertical
      gap={24}
      align="center"
      style={{
        marginTop: HONOR_CARD_MARGIN[place],
      }}>
      <Badge count={place} offset={[-size / 2, size]} color={HONOR_CARD_COLOR_BADGE[place]}>
        <Avatar src={url} icon={<UserOutlined />} size={size} />
      </Badge>

      <Flex vertical align="center">
        <Text>{username}</Text>
        <Text>{`${score}${time ? '/' + time : ''}`}</Text>
      </Flex>
    </Flex>
  );
};

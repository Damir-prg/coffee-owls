import React, { FC } from 'react';
import { ILeaderBoardData } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import {
  AVATAR_HONOR_PREVIEW_SIZE,
  EHONOR_PREVIEW_PLACE,
  HONOR_CARD_COLOR_BADGE,
  HONOR_CARD_MARGIN,
} from 'widgets/LeaderBoardHonorPreview/types/LeaderBoardHonorPreview.types';
import { BaseUrlApi } from 'shared/config/config';
import { Avatar, Badge, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Text } = Typography;

export const HonorCard: FC<{
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

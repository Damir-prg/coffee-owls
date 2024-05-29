import React, { FC } from 'react';
import { Flex } from 'antd';
import { ILeaderBoardResponse } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { HonorCard } from 'widgets/LeaderBoardHonorPreview/ui/LeaderBoardHonorCard';

export const LeaderBoardHonorPreview: FC<{ data: Array<ILeaderBoardResponse> }> = ({ data }) => {
  return (
    <Flex gap={24} justify="center">
      <HonorCard data={data[1]?.data ?? null} place={2} />
      <HonorCard data={data[0]?.data ?? null} place={1} />
      <HonorCard data={data[2]?.data ?? null} place={3} />
    </Flex>
  );
};

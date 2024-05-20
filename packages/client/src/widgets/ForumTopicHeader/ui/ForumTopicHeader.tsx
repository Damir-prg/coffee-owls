import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import EROUTES from 'shared/lib/RoutesEnum';

import './ForumTopicHeader.css';

type TProps = {
  title: string;
};

export function ForumTopicHeader({ title }: TProps) {
  const { Title } = Typography;

  const navigate = useNavigate();

  const handleNavigateForum = useCallback(() => {
    navigate('/' + EROUTES.FORUM);
  }, [navigate]);

  return (
    <Flex gap={8} justify="flex-start" align="center" className="topic__container-header">
      <Button
        onClick={handleNavigateForum}
        type="text"
        icon={<LeftOutlined className="topic__container_header-back" />}
      />
      <Title level={3}>{title}</Title>
    </Flex>
  );
}

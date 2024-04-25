import { Flex, Typography } from 'antd';

const { Text, Title } = Typography;

export const GameCountdownForm = () => {
  return (
    <Flex vertical align="center" justify="center" gap={16}>
      <Title level={5} className="title__primary">
        Игра начнётся через:
      </Title>
      <Text className="numeric-font title__primary">15</Text>
    </Flex>
  );
};

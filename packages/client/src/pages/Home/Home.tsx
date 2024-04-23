import { Flex, Image, Typography } from 'antd';
import './Home.css';
import homeImg from 'images/home.jpeg';
import React from 'react';

const { Text, Title } = Typography;

function Home() {
  return (
    <Flex className="page-content" gap={36} vertical align="center">
      <Title level={1} className="title__primary">
        Добро пожаловать, дорогой друг!
      </Title>
      <Text className="numeric-font numeric-title title__primary">2048</Text>
      <Text className="text__pre-wrap text__center-align">
        – это захватывающая головоломка, которая повышает вашу логику и стратегическое мышление.
        {'\n'}
        Вам нужно объединять плитки с одинаковыми числами, чтобы получить число 2048.
        {'\n'}
        Звучит просто? Попробуйте себя в этой игре и убедитесь, насколько она увлекательна.
      </Text>
      <Image height={400} width={575} src={homeImg} preview={false} alt="Превью картинки" />
    </Flex>
  );
}

export default Home;

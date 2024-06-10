import { Button, Flex, Image, Typography } from 'antd';
import './Home.css';
import homeImg from 'images/home.jpeg';
import React from 'react';
import EROUTES from 'shared/lib/RoutesEnum';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  function handleStartGame() {
    navigate(`/${EROUTES.GAME}`);
  }

  return (
    <Flex className="page-content" gap={32} vertical align="center">
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
      <Button size="large" type="primary" onClick={handleStartGame}>
        НАЧАТЬ ИГРУ
      </Button>
      <Image height={400} width={575} src={homeImg} preview={false} alt="Превью картинки" />
    </Flex>
  );
};

export default Home;

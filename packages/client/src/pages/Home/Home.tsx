import { Button, Flex, Image, Spin, Typography } from 'antd';
import './Home.css';
import homeImg from 'images/home.jpeg';
import React, { useCallback, useEffect, useRef } from 'react';
import EROUTES from 'shared/lib/RoutesEnum';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginYandex } from 'shared/api/oauthApi/oauthApi';
import { getErrorStatus } from 'shared/lib/ErrorMessage';

const { Text, Title } = Typography;

const Home = () => {
  const isLoadingLogin = useRef<boolean>(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const handleYandexLogin = useCallback(async (code: string) => {
    const redirectUri = import.meta.env.VITE_YANDEX_REDIRECT_URL;

    isLoadingLogin.current = true;

    try {
      await loginYandex({ code, redirect_uri: redirectUri });

      navigate('/' + EROUTES.HOME);
    } catch (error) {
      if (getErrorStatus(error) === 400) {
        navigate('/' + EROUTES.HOME);
      } else {
        navigate('/' + EROUTES.SIGN_IN);
      }
    } finally {
      isLoadingLogin.current = false;
    }
  }, []);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !isLoadingLogin.current) {
      handleYandexLogin(code);
    }
  }, [isLoadingLogin.current]);

  function handleStartGame() {
    navigate(`/${EROUTES.GAME}`);
  }

  if (isLoadingLogin.current) {
    return <Spin>Загрузка..</Spin>;
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

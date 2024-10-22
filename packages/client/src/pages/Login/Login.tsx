import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Divider, Image, Typography } from 'antd';
import EROUTES from 'shared/lib/RoutesEnum';
import PublicWindow from 'shared/components/PublicWindow/PublicWindow';
import PageForm from 'shared/components/PageForm/PageForm';
import { TLoginFormFields, loginFormFields } from './Login.models';
import loginImg from 'images/public-person-img.svg';
import { login } from 'shared/api/authApi/authApi';
import getErrorMessage from 'shared/lib/ErrorMessage';
import { YandexLoginButton } from 'widgets/YandexLoginButton';

function Login() {
  const { Title, Text } = Typography;
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState({ isShow: false, text: '' });

  const onSubmit = useCallback(async (formData: Record<string, string>) => {
    setErrorMessage({ isShow: false, text: '' });
    const loginData: TLoginFormFields = {
      login: formData.login,
      password: formData.password,
    };
    try {
      await login(loginData);
      navigate('/' + EROUTES.HOME);
    } catch (err) {
      setErrorMessage({ isShow: true, text: getErrorMessage(err) });
    }
  }, []);

  return (
    <PublicWindow>
      <Flex className="public-window__container" vertical align="left" gap={32}>
        <Flex vertical align="left" gap={4}>
          <Title className="title__primary" level={3}>
            Привет!
          </Title>
          <Text>Рады снова тебя видеть!</Text>
        </Flex>
        <Image width={400} src={loginImg} preview={false} alt="Изображение мальчика"></Image>
      </Flex>
      <Divider type="vertical" />
      <Flex className="public-window__container" vertical align="center">
        <PageForm
          formName="login"
          title="Войти"
          fields={loginFormFields}
          button={{ type: 'primary', text: 'Войти' }}
          formError={errorMessage}
          link={{ text: 'Нет аккаунта? - зарегистрируйся, мы тебя ждём:)', path: EROUTES.SIGN_UP }}
          onSubmit={onSubmit}
        />
        <YandexLoginButton />
      </Flex>
    </PublicWindow>
  );
}

export default Login;

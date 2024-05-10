import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Divider, Image, Typography } from 'antd';
import EROUTES from 'shared/lib/RoutesEnum';
import PublicWindow from 'shared/components/PublicWindow/PublicWindow';
import PageForm from 'shared/components/PageForm/PageForm';
import { TLoginFormFields, loginFormFields } from './Login.models';
import loginImg from 'images/public-person-img.svg';
import { useAuth } from 'shared/context/AuthContext';
import { login, getUser } from 'shared/api/authApi';

function Login() {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [errorMessage, setErrorMessage] = useState({ isShow: false, status: 0 });

  const onSubmit = useCallback((formData: Record<string, unknown>) => {
    setErrorMessage({ isShow: false, status: 0 });
    const loginData: TLoginFormFields = {
      login: formData.login as string,
      password: formData.password as string,
    };
    login(loginData)
      .then(() => {
        getUser()
          .then(() => {
            setIsLoggedIn(true);
            navigate('/');
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        setErrorMessage({ isShow: true, status: err.status });
      });
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
          link={{ text: 'Нет аккаунта? - зарегестрируйся, мы тебя ждём:)', path: EROUTES.SIGN_UP }}
          onSubmit={onSubmit}
        />
      </Flex>
    </PublicWindow>
  );
}

export default Login;

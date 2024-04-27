import './Login.css';
import loginImg from 'images/public-person-img.svg';
import { loginFormFields } from './Login.models';
import { Flex, Divider, Image, Typography } from 'antd';
import PublicWindow from 'shared/components/PublicWindow/PublicWindow';
import PageForm from 'shared/components/PageForm/PageForm';

function Login() {
  const { Title, Text } = Typography;

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
          link={{ text: 'Нет аккаунта? - зарегестрируйся, мы тебя ждём:)', path: 'sign-up' }}
        />
      </Flex>
    </PublicWindow>
  );
}

export default Login;

import { registrationFormFields } from './Registration.models';
import { Flex } from 'antd';
import PublicWindow from 'shared/components/PublicWindow/PublicWindow';
import PageForm from 'shared/components/PageForm/PageForm';

function Registration() {
  return (
    <PublicWindow>
      <Flex className="public-window__container" vertical align="center">
        <PageForm
          formName="registration"
          title="Регистрация"
          fields={registrationFormFields}
          button={{ type: 'primary', text: 'Зарегистрироваться' }}
          link={{ text: 'Уже есть аккаует? - Войти', path: 'sign-in' }}
        />
      </Flex>
    </PublicWindow>
  );
}

export default Registration;

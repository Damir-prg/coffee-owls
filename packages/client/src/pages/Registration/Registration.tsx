import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import EROUTES from 'shared/lib/RoutesEnum';
import PublicWindow from 'shared/components/PublicWindow/PublicWindow';
import PageForm from 'shared/components/PageForm/PageForm';
import { TRegistrationFormFields, registrationFormFields } from './Registration.models';
import { useAuth } from 'shared/context/AuthContext';
import { registration, getUser } from 'shared/api/authApi';
import getErrorMessage from 'shared/lib/ErrorMessage';

function Registration() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [errorMessage, setErrorMessage] = useState({ isShow: false, text: '' });

  const onSubmit = useCallback(async (formData: Record<string, unknown>) => {
    try {
      setErrorMessage({ isShow: false, text: '' });

      const registrationData: TRegistrationFormFields = {
        first_name: formData.first_name as string,
        second_name: formData.second_name as string,
        email: formData.email as string,
        phone: formData.phone as string,
        login: formData.login as string,
        password: formData.password as string,
      };

      await registration(registrationData);
      await getUser();

      setIsLoggedIn(true);
      navigate('/' + EROUTES.HOME);
    } catch (err) {
      setErrorMessage({ isShow: true, text: getErrorMessage(err) });
    }
  }, []);

  return (
    <PublicWindow>
      <Flex className="public-window__container" vertical align="center">
        <PageForm
          formName="registration"
          title="Регистрация"
          fields={registrationFormFields}
          button={{ type: 'primary', text: 'Зарегистрироваться' }}
          formError={errorMessage}
          link={{ text: 'Уже есть аккаует? - Войти', path: EROUTES.SIGN_IN }}
          onSubmit={onSubmit}
        />
      </Flex>
    </PublicWindow>
  );
}

export default Registration;

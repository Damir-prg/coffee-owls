import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import EROUTES from 'shared/lib/RoutesEnum';
import PublicWindow from 'shared/components/PublicWindow/PublicWindow';
import PageForm from 'shared/components/PageForm/PageForm';
import { TRegistrationFormFields, registrationFormFields } from './Registration.models';
import { useAuth } from 'shared/context/AuthContext';
import { registration, getUser } from 'shared/api/authApi';

function Registration() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [errorMessage, setErrorMessage] = useState({ isShow: false, status: 0 });

  const onSubmit = useCallback((formData: Record<string, unknown>) => {
    setErrorMessage({ isShow: false, status: 0 });
    const registrationData: TRegistrationFormFields = {
      first_name: formData.first_name as string,
      second_name: formData.second_name as string,
      email: formData.email as string,
      phone: formData.phone as string,
      login: formData.login as string,
      password: formData.password as string,
    };
    registration(registrationData)
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

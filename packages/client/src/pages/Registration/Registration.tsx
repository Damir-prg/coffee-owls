import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData } from 'shared/store/user/userActions';
import type { TAppDispatch } from 'shared/store/store';
import { Flex } from 'antd';
import EROUTES from 'shared/lib/RoutesEnum';
import PublicWindow from 'shared/components/PublicWindow/PublicWindow';
import PageForm from 'shared/components/PageForm/PageForm';
import { TRegistrationFormFields, registrationFormFields } from './Registration.models';
import { registration } from 'shared/api/authApi/authApi';
import getErrorMessage from 'shared/lib/ErrorMessage';

function Registration() {
  const navigate = useNavigate();

  const dispatch = useDispatch<TAppDispatch>();

  const [errorMessage, setErrorMessage] = useState({ isShow: false, text: '' });

  const onSubmit = useCallback(async (formData: Record<string, string>) => {
    setErrorMessage({ isShow: false, text: '' });
    const registrationData: TRegistrationFormFields = {
      first_name: formData.first_name,
      second_name: formData.second_name,
      email: formData.email,
      phone: formData.phone,
      login: formData.login,
      password: formData.password,
    };
    try {
      await registration(registrationData);
      navigate('/' + EROUTES.HOME);
      await dispatch(getUserData());
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
          link={{ text: 'Уже есть аккаунт? - Войти', path: EROUTES.SIGN_IN }}
          onSubmit={onSubmit}
        />
      </Flex>
    </PublicWindow>
  );
}

export default Registration;

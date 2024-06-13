import { Typography, Flex } from 'antd';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';
import './YandexLoginButton.css';
import { getYandexServiceId } from 'shared/api/oauthApi/oauthApi';
import { useCallback, useState } from 'react';
import { getYandexOauthUrl } from 'shared/utils/oauthHelpers';

export function YandexLoginButton() {
  const { Text } = Typography;

  const [error, setError] = useState<string | null>(null);

  const handleYandexLogin = useCallback(async () => {
    const redirectUri = import.meta.env.VITE_YANDEX_REDIRECT_URL;

    if (error) {
      setError(null);
    }

    try {
      const serviceData = await getYandexServiceId(redirectUri);

      if (serviceData && redirectUri) {
        window.location.href = getYandexOauthUrl({ clientId: serviceData.service_id, redirectUri });
      }
    } catch (error) {
      setError('Произошла ошибка. Попробуйте позже.');
    }
  }, []);

  return (
    <Flex vertical align="center" gap={10}>
      <Text className="yandex_login__button__pre-text">или</Text>
      <ButtonSecondary size="middle" onClick={handleYandexLogin}>
        <Text className="yandex_login__button-text">Войти c Яндекс ID</Text>
      </ButtonSecondary>
      {error && <Text className="yandex__login__error-text">{error}</Text>}
    </Flex>
  );
}

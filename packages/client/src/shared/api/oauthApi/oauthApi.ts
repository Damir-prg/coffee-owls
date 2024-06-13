import api from '../api';
import { TYandexLoginRequest, TYandexService } from './oauth.models';

const yandexAuthUrl = '/oauth/yandex';

export const getYandexServiceId = (redirectUri: string): Promise<TYandexService | null> => {
  return api.get(`${yandexAuthUrl}/service-id?redirect_uri=${redirectUri}`);
};

export const loginYandex = (data: TYandexLoginRequest): Promise<void | null> => {
  return api.post(yandexAuthUrl, { data });
};

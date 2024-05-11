import { ILoginRequest, IRegistrationRequest } from 'shared/interfaces/IAuthData';
import { apiGet, apiPost } from './api';

const authUrl = '/auth';

export const getUser = (): Promise<unknown> => {
  return apiGet(`${authUrl}/user`);
};

export const login = (data: ILoginRequest): Promise<unknown> => {
  return apiPost(`${authUrl}/signin`, { data });
};

export const registration = (data: IRegistrationRequest): Promise<unknown> => {
  return apiPost(`${authUrl}/signup`, { data });
};

export const logout = (): Promise<unknown> => {
  return apiPost(`${authUrl}/logout`);
};

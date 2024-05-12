import { ILoginRequest, IRegistrationRequest } from 'shared/interfaces/IAuthData';
import api from './api';

const authUrl = '/auth';

export const getUser = (): Promise<unknown> => {
  return api.get(`${authUrl}/user`);
};

export const login = (data: ILoginRequest): Promise<unknown> => {
  return api.post(`${authUrl}/signin`, { data });
};

export const registration = (data: IRegistrationRequest): Promise<unknown> => {
  return api.post(`${authUrl}/signup`, { data });
};

export const logout = (): Promise<unknown> => {
  return api.post(`${authUrl}/logout`);
};

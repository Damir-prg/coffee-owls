import { BaseUrlApi } from 'shared/config/config';
import { ILoginRequest, IRegistrationRequest } from 'shared/interfaces/IAuthData';

function handleResponse(res: Response): Promise<unknown> {
  if (res.ok) {
    const contentType = res.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    }
    return res.text();
  } else {
    return Promise.reject(res);
  }
}

export const getUser = (): Promise<unknown> => {
  return fetch(`${BaseUrlApi}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => handleResponse(res));
};

export const login = (data: ILoginRequest): Promise<unknown> => {
  return fetch(`${BaseUrlApi}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(res => handleResponse(res));
};

export const registration = (data: IRegistrationRequest): Promise<unknown> => {
  return fetch(`${BaseUrlApi}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(res => handleResponse(res));
};

export const logout = (): Promise<unknown> => {
  return fetch(`${BaseUrlApi}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => handleResponse(res));
};

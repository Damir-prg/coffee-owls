import { BaseUrlApi } from 'shared/config/config';
import { EMETHOD, defaultOptions } from './types';
import type { TOptions, TRequestFunction } from './types';

const apiRequest = async (url: string, options: TOptions = defaultOptions): Promise<unknown> => {
  const { headers = {}, method, data, withCredentials, responseType } = { ...defaultOptions, ...options };

  const requestOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: withCredentials ? 'include' : 'same-origin',
  };

  try {
    const response = await fetch(BaseUrlApi + url, requestOptions);
    return handleResponse(response, responseType);
  } catch (err) {
    console.error(err);
  }
};

const handleResponse = async (res: Response, responseType?: 'json' | undefined) => {
  if (res.ok) {
    const contentType = res.headers.get('Content-Type') || responseType;
    if (contentType && contentType.includes('json')) {
      return res.json();
    }
    return res.text();
  } else {
    return Promise.reject(res);
  }
};

const createApiMethod =
  (method: EMETHOD): TRequestFunction =>
  (url, options) =>
    apiRequest(url, { ...options, method });

const api: Record<string, TRequestFunction> = {
  get: createApiMethod(EMETHOD.GET),
  post: createApiMethod(EMETHOD.POST),
  put: createApiMethod(EMETHOD.PUT),
  patch: createApiMethod(EMETHOD.PATCH),
  delete: createApiMethod(EMETHOD.DELETE),
};

export default api;

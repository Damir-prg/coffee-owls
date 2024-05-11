import { BaseUrlApi } from 'shared/config/config';

enum EMETHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TOptions = {
  method: EMETHOD;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json';
};

const defaultOptions: TOptions = {
  method: EMETHOD.GET,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
  withCredentials: true,
  responseType: 'json',
};

const apiRequest = (url: string, options: TOptions = defaultOptions): Promise<unknown> => {
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

  return fetch(BaseUrlApi + url, requestOptions).then(response => handleResponse(response, responseType));
};

const handleResponse = (res: Response, responseType?: 'json' | undefined) => {
  if (res.ok) {
    const contentType = responseType || res.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    }
    return res.text();
  } else {
    return Promise.reject(res);
  }
};

const apiGet = (url: string, options?: Omit<TOptions, 'method'>): Promise<unknown> =>
  apiRequest(url, { ...options, method: EMETHOD.GET });

const apiPost = (url: string, options?: Omit<TOptions, 'method'>): Promise<unknown> =>
  apiRequest(url, { ...options, method: EMETHOD.POST });

const apiPut = (url: string, options?: Omit<TOptions, 'method'>): Promise<unknown> =>
  apiRequest(url, { ...options, method: EMETHOD.PUT });

const apiPatch = (url: string, options?: Omit<TOptions, 'method'>): Promise<unknown> =>
  apiRequest(url, { ...options, method: EMETHOD.PATCH });

const apiDelete = (url: string, options?: Omit<TOptions, 'method'>): Promise<unknown> =>
  apiRequest(url, { ...options, method: EMETHOD.DELETE });

export { apiRequest, apiGet, apiPost, apiPut, apiPatch, apiDelete };

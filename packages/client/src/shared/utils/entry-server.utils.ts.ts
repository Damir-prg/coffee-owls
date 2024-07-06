import { Request as ExpressRequest } from 'express';
import { TPageInitContext } from 'widgets/WithRoutes/WithRoutes';

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`;

  return new URL(req.originalUrl || req.url, origin);
};

export const createContext = (req: ExpressRequest): TPageInitContext => ({
  clientToken: req.cookies.token,
});

export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: {
    method: string;
    headers: Headers;
    signal: AbortSignal;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any; // Пример взят из теории, типизировать через unknown мне не удалось
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
};

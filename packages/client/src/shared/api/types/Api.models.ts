import { EMETHOD } from './MethodEnum';

export type TOptions = {
  method: EMETHOD;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json';
};

export type TRequestFunction = (url: string, options?: Omit<TOptions, 'method'>) => Promise<unknown>;

export const defaultOptions: TOptions = {
  method: EMETHOD.GET,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
  withCredentials: true,
  responseType: 'json',
};

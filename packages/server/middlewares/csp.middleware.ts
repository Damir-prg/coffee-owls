import type { NextFunction, Request, Response } from 'express';

const cspMiddleware = () => {
  return (_req: Request, res: Response, next: NextFunction) => {
    // git commit изменяет кавычки
    res.setHeader(
      'Content-Security-Policy-Report-Only',
      // eslint-disable-next-line quotes
      "font-src 'self'; img-src 'self' blob: https://ya-praktikum.tech; frame-src 'self'; media-src 'self'",
    );
    next();
  };
};

export default cspMiddleware;

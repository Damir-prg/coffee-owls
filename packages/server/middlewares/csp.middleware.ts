import type { NextFunction, Request, Response } from 'express';

const cspMiddleware = () => {
  return (_req: Request, res: Response, next: NextFunction) => {
    // git commit изменяет кавычки
    res.setHeader(
      'Content-Security-Policy',
      // eslint-disable-next-line quotes
      "font-src 'self'; img-src 'self' blob:; frame-src 'self'; media-src 'self'",
    );
    next();
  };
};

export default cspMiddleware;

import type { NextFunction, Request, Response } from 'express';

const cspMiddleware = () => {
  return (_req: Request, res: Response, next: NextFunction) => {
    // git commit изменяет кавычки
    // eslint-disable-next-line quotes
    res.setHeader('Content-Security-Policy', "font-src 'self'; img-src 'self'; frame-src 'self'; media-src 'self'");
    next();
  };
};

export default cspMiddleware;

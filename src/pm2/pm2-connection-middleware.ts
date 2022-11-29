import type { NextFunction, Request, Response } from 'express';
import { isDisableKeepAlive } from './pm2';

export function pm2ConnectionMiddleware(req: Request, res: Response, next: NextFunction) {
  if (isDisableKeepAlive) {
    res.set('Connection', 'close');
  }
  next();
}

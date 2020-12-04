import { Request, Response, NextFunction } from 'express';
import { isLoggedIn, logOut } from '../auth';
import { SESSION_ABSOLUTE_TIMEOUT } from '../config';
import { Unauthorized } from '../errors';

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new Unauthorized('You are already logged in'));
  }

  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized('You must be logged in'));
  }

  next();
};

export const active = async (req: any, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;

    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logOut(req, res);

      return next(new Unauthorized('Session expired'));
    }
  }
};

import express, { NextFunction, Request, Response } from 'express';
import session, { Store } from 'express-session';

import { SESSION_OPTIONS } from './config';
import { serverError, notFound, catchAsync } from './middleware';
import { active } from './middleware/auth';
import { login, register, home } from './routes';

export const createApp = (store: Store) => {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store: store
    })
  );

  app.use(catchAsync(active));

  app.use(home);

  app.use(login);

  app.use(register);

  app.get("/hello", (req, res ) => {
    throw new Error("Hello world");
  })

  app.use(notFound);

  app.use(serverError);
  return app;
};

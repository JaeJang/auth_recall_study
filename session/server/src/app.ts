import express, { NextFunction, Request, Response } from "express";
import session, { Store } from "express-session";

import { SESSION_OPTIONS } from "./config";
import { serverError, notFound } from "./middleware";
import { login, register, home } from "./routes";

export const createApp = (store: Store) => {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store: store,
    })
  );

  app.use(home);
  
  app.use(login);

  app.use(register);

  app.use(notFound);

  app.use(serverError);
  return app;
};

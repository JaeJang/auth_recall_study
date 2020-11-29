import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import dotenv from 'dotenv';

import { DB_CONFIG, REDIS_OPTIONS, APP_PORT, SESSION_OPTIONS } from "./config";



dotenv.config({path :`${__dirname}/../.env`});

const RedisStore = connectRedis(session);

const client = new Redis(REDIS_OPTIONS);

createConnection(DB_CONFIG).then((connection) => {
  const app = express();

  app.use(
    session({
      ...SESSION_OPTIONS,
      store: new RedisStore({ client: client }),
    })
  );

  app.listen(APP_PORT, () => {
    console.log(`connected to ${APP_PORT}`)
  });
});

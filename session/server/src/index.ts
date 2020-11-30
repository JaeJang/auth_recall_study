import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import dotenv from "dotenv";

import { DB_CONFIG, REDIS_OPTIONS, APP_PORT, SESSION_OPTIONS } from "./config";
import { createApp } from "./app";

createConnection(DB_CONFIG).then((connection) => {
  dotenv.config({ path: `${__dirname}/../.env` });

  const RedisStore = connectRedis(session);

  const client = new Redis(REDIS_OPTIONS);

  const store = new RedisStore({ client: client });
  
  const app = createApp(store);

  app.listen(APP_PORT, () => {
    console.log(`connected to ${APP_PORT}`);
  });
});

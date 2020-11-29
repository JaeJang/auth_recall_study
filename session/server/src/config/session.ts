import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";

const HALF_HOUR = 1000 * 60 * 30;

const {
  SESSION_SECRET = "this is session secret",
  SSSION_NAME = "sid",
  SESSION_IDEL_TIMEOUT = HALF_HOUR,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SSSION_NAME,
  cookie: {
    maxAge: +SESSION_IDEL_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  //genid: ,
  rolling: true,
  resave: false,
  saveUninitialized: false,
  

  
};

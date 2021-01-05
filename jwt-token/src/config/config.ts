import dotenv from "dotenv";

const {
  SERVER_TOKEN_EXPIRETIME = 1200,
  SERVER_TOKEN_ISSUER = "jae",
  SERVER_TOKEN_SECRET = "secret",
  SERVER_HOSTNAME = "localhost",
  SERVER_PORT = 1337,
} = process.env;

export const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

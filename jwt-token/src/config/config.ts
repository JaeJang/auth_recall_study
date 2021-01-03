import dotenv from 'dotenv';

const SERVER_TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME;
const SERVER_TOKEN_ISSUER = process.env.TOKEN_ISSUER;
const SERVER_TOKEN_SECRET = process.env.TOKEN_SECRET;

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

export const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
      expireTime: SERVER_TOKEN_EXPIRETIME,
      issuer: SERVER_TOKEN_ISSUER,
      secret: SERVER_TOKEN_SECRET
    }
};

const config = {
  server: SERVER
}

export default config;

import jwt from "jsonwebtoken";
import config from "../config/config";
import IUser from "../interfaces/user";

export const signJWT = (user: IUser, cb: (error: Error | null, token: string | null) => void): void => {
  var timeSinchEpoch = new Date().getTime();
  var expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      {
        username: user.username,
      },
      config.server.token.secret!,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          cb(error, null);
        } else if (token) {
          cb(null, token);
        }
      }
    );
  } catch (error) {
    cb(error, null);
  }
};

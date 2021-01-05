import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { SERVER } from "../config/config";
import { NotFound, Unauthorized } from "../errors";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, SERVER.token.secret!, (error, decoded) => {
      if (error) {
        throw new NotFound();
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    throw new Unauthorized();
  }
};

export default extractJWT;

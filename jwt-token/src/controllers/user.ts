import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";

const NAMESPACE = "Users";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Authroized",
  });
};
const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }
  });
};
const login = (req: Request, res: Response, next: NextFunction) => {};
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};

export default { validateToken, register, login, getAllUsers };

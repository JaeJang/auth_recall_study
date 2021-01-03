import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { signJWT } from "../functions/singJWT";
import { query } from "../config/database";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Authroized",
  });
};
const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, async (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }

    const queryText = "INSERT INTO users (username, password) VALUES ($1, $2)";
    const values = [username, hash];
    try {
      const result = await query(queryText, values);
      console.log(result);
      res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  });
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const queryText = "SELECT * FROM users WHERE username = $1";
  const value = username;

  try {
    const users: any = await query(queryText, value);
    bcryptjs.compare(password, users[0].password, (error, result) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
          error,
        });
      } else if (result) {
        signJWT(users[0], (_error, token) => {
          if (_error) {
            return res.status.status(401).json({
              message: "Unable to sign JWT",
              error: _error,
            });
          } else if (token) {
            return res.status(200).json({
              message: "Auth Successfule",
              token,
              user: users[0],
            });
          }
        });
      }
    });
  } catch (error) {}
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const queryText = "SELECT id, username FROM users";

  try {
    const results = await query(queryText, null);
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
    }
};

export default { validateToken, register, login, getAllUsers };

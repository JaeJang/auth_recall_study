import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { signJWT } from "../functions/singJWT";
import { query } from "../config";
import { catchAsync } from "../middleware/error";
import { Unauthorized } from "../errors";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Authroized",
  });
};
const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  const hash = await bcryptjs.hash(password, 10);

  const queryText = "INSERT INTO users (username, password) VALUES ($1, $2)";
  const values = [username, hash];

  const result = await query(queryText, values);
  console.log(result);
  res.status(201).json(result);
});

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const queryText = "SELECT * FROM users WHERE username = $1";
  const value = username;

  const results: any = await query(queryText, [value]);
  console.log(results.rows);
  const result = await bcryptjs.compare(password, results.rows[0].password);

  if (result) {
    signJWT(results.rows[0], (error, token) => {
      if (error) {
        console.error(error);
        throw new Unauthorized("Unable to sign JWT");
      } else if (token) {
        return res.status(200).json({
          message: "Auth Successfule",
          token,
          user: results.rows[0],
        });
      }
    });
  }
});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const queryText = "SELECT id, username FROM users";

  const results: any = await query(queryText, null);

  res.status(200).json(results.rows);
});

export default { validateToken, register, login, getAllUsers };

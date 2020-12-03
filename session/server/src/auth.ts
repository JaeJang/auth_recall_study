import { Request, Response } from "express";
import { SESSION_NAME } from "./config";

export const isLoggedIn = (req: any) => !!req.session.userId;

export const logIn = (req: any, userId: number) => {
  req.session.userId = userId;
};

export const logOut = (req: Request, res: Response) => {
  new Promise<void>((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);

      resolve();
    });
  });
};

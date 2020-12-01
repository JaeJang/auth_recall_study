import { Request } from "express";
import session  from "express-session";

export const isLoggedIn = (req: any) => !!req.session.userId;

export const logIn = (req: any, userId: number) => {
  req.session.userId = userId;
} 
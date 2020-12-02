import { Router, Request, Response } from "express";
import { getConnection } from "typeorm";
import { Unauthorized } from "../errors";
import { catchAsync, logIn, logOut } from "../middleware";
import { auth, guest } from "../middleware/auth";
import User from "../models/user";
import { loginSchema, validate } from "../validation";

const router = Router();

router.post(
  "/login",
  guest,
  catchAsync(async (req: Request, res: Response) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await getConnection().getRepository(User).findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
      throw new Unauthorized("Incorrect email or password");
    }

    logIn(req, user.id);

    res.json({ message: 'OK'})
  })
);

router.post("/logout", auth, async (req, res) => {
  await logOut(req, res);

  res.json({message: 'OK'});
});

export default router;

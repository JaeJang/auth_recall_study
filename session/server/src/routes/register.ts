import { Request, Response, Router } from "express";
import { getConnection, getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../models/user";
import { registerSchema, validate } from "../validation";
import { logIn } from "../auth";
import { guest } from "../middleware/auth";
import { catchAsync } from "../middleware";
import { BadRequest } from "../errors";

const router = Router();

router.post(
  "/register",
  guest,
  catchAsync(async (req: Request, res: Response) => {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;

    const found = await getRepository(User).findOne({ email: email });

    if (found) {
      throw new BadRequest("Invalid Email");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await getRepository(User).save({ email, password: hashedPassword, salt, name });

    logIn(req, user.id);

    res.send(user);
  })
);

export default router;

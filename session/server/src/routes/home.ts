import { Request, Router } from "express";
import { getConnection } from "typeorm";
import { catchAsync } from "../middleware";
import { auth } from "../middleware/auth";
import User from "../models/user";

const router = Router();

router.get(
  "/home",
  auth,
  catchAsync(async (req: any, res: any) => {
    const user = await getConnection()
      .getRepository(User)
      .findOne({ select: ["id", "email", "name"], where: { id: req.session.userId } });

    res.json(user);
  })
);

export default router;

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import session from "express-session";
import mongoose, { Error } from "mongoose";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "./User";

mongoose.connect(
  "mongodb://jaeadmin:password@localhost:27017/oauth",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: Error) => {
    if (err) throw err;
    console.log("connected");
  }
);

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.post("/register", async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  await newUser.save();
  res.send("success");
});

app.listen(4000, () => {
    console.log("service started");
})

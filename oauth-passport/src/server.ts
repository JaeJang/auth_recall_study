import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import mongoose, { Error } from "mongoose";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";

import User from "./User";

const GoogleStrategy = passportGoogle.Strategy;

mongoose.connect(
  "mongodb://jae:password@localhost:27017/oauth?authSource=admin",
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

// middleware
app.use(express.json());
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

//passport
passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:4000/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({ googleId: profile.id });
          await newUser.save();
          return done(undefined, newUser);
        } else {
          return done(undefined, user);
        }
      } catch (err) {
        throw err;
      }
    }
  )
);

passport.serializeUser((user: any, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: any) => {
    cb(err, user);
  });
});

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// routes
app.get("/", (req, res) => res.send("Example Home page!"));
app.get("/failed", (req, res) => res.send("You Failed to log in!"));

app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req: Request, res: Response) => {
    res.redirect("/good");
  }
);

app.get("/logout", async (req: Request, res: Response) => {
  req.session.destroy(() => {
    req.logout();
    res.redirect("/");
  });
});

app.get("/good", isLoggedIn, (req: Request, res: Response) => {
  res.send(req.user);
});

app.listen(4000, () => {
  console.log("service started");
});

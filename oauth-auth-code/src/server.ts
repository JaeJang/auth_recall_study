import express, { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { URLSearchParams } from "url";
import cookieSession from "cookie-session";

dotenv.config({ path: `${__dirname}/../.env` });

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  refreshTokenExpiresIn: string;
}

const { PORT, CLIENT_ID, CLIENT_SECRET, COOKIE_SECRET } = process.env;

const app = express();

app.use(
  cookieSession({
    secret: COOKIE_SECRET,
    httpOnly: true,
  })
);

app.get("/login/github", (req: Request, res: Response) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:9000/login/github/callback`;
  res.redirect(url);
});

app.get("/login/github/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const tokenData: TokenData = await getAccessToken(code);
  const githubData = await getGithubUser(tokenData.accessToken);

  if (githubData) {
    req.session!.githubId = githubData.id;
    req.session!.token = tokenData.accessToken;
    res.redirect("/admin");
  } else {
    res.send(githubData);
  }
});

app.get("/admin", (req: Request, res: Response) => {
  if (req.session!.githubId) {
    res.send(`HELLO THERE id: ${req.session!.githubId}`);
  } else {
    res.status(401);
  }
});

app.get("/logout", (req: Request, res: Response) => {
  req.session = null;
  res.redirect("/");
});

async function getAccessToken(code: string): Promise<TokenData> {
  const result = await axios.post(
    "https://github.com/login/oauth/access_token",
    { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code },
    {
      headers: {
        "Content-Type": "application/json;",
      },
    }
  );

  const params = new URLSearchParams(result.data);

  return {
    accessToken: params.get("access_token") as string,
    refreshToken: params.get("refresh_token") as string,
    expiresIn: params.get("expires_in") as string,
    refreshTokenExpiresIn: params.get("refresh_token_expires_in") as string,
  };
}

async function getGithubUser(accessToken: string) {
  
  const result = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `bearer ${accessToken}` },
  });

  return result.data;
}

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});

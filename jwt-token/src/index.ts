import express from "express";
import user from "./routes/user";
import { notFound, serverError } from "./middleware/error";
import { SERVER } from "./config/config";

const app = express();

app.use(express.json());

app.use(user);

app.use(notFound);
app.use(serverError);

app.listen(SERVER.port, () => {
  console.log(`connectedto ${SERVER.port}`);
});

import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env` });

export * from "./database";

export * from "./config";


import { ConnectionOptions } from "typeorm";
import User from "../user";

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST = "localhost", DB_PORT = 5432 } = process.env;

export const DB_CONFIG: ConnectionOptions = {
  type: "postgres",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: +DB_PORT,
  entities: [User],
  synchronize: true,
};

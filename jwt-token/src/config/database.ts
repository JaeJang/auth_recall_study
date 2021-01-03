import { Pool } from "pg";
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST = "localhost", DB_PORT = 5432 } = process.env;

export const pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: +DB_PORT,
  database: DB_DATABASE,
});

export const query = (queryText: string, params: any) => {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, params)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

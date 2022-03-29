import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  NODE_ENV,
} = process.env;

const Client = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
export default Client;

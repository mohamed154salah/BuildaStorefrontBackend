import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

export type User = {
  id?: number,
  username: string,
  password_digest: string,
};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";

      const hash = bcrypt.hashSync(
        u.password_digest + BCRYPT_PASSWORD,
        // eslint-disable-next-line prettier/prettier
        parseInt(SALT_ROUNDS as unknown as string)
      );

      const result = await conn.query(sql, [u.username, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`unable delete user (${id}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT password_digest,id ,username FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);


    if (result.rows.length ) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)
      ) {
        return user;
      }
    }

    return null;
  }
}

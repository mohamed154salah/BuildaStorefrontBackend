import Client from "../database";

export type Order = {
  id?: number,
  status: string,
  user_id: number,
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders;";
      const result = await conn.query(sql);
      conn.release();
      if (result.rowCount) {
        return result.rows;
      } else {
        throw Error();
      }
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      throw new Error(`unable get Order: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id = $1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rowCount) {
        return result.rows[0];
      } else {
        throw Error();
      }
    } catch (err) {
      throw new Error(`unable get Order ${id}`);
    }
  }

  async create(orders: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *;";
      const result = await conn.query(sql, [orders.status, orders.user_id]);
      conn.release();
      if (result.rowCount) {
        return result.rows[0];
      } else {
        throw Error();
      }
    } catch (err) {
      throw new Error(`unable create Order ${orders.id}: ${err}`);
    }
  }

  async destroy(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE from orders WHERE id = ($1) RETURNING *;";
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rowCount) {
        return result.rows[0];
      } else {
        throw Error();
      }
    } catch (err) {
      throw new Error(`unable delete Order ${id}: ${err}`);
    }
  }
}

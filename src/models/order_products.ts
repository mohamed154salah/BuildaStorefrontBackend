import Client from "../database";

export type order_products = {
  id?: number,
  quantity: number,
  order_id: number,
  product_id: number,
};

export class Order_productsStore {
  async index(): Promise<order_products[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM order_products;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get order_products: ${err}`);
    }
  }

  async show(id: number): Promise<order_products> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM order_products WHERE id = $1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable get order_products ${id}: ${err}`);
    }
  }

  async create(products: order_products): Promise<order_products> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *;";
      const result = await conn.query(sql, [
        products.quantity,
        products.order_id,
        products.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable create order_products ${products.order_id}: ${err}`
      );
    }
  }

  async destroy(id: number): Promise<order_products> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE from order_products WHERE id = ($1);";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable delete order_products ${id}: ${err}`);
    }
  }
}

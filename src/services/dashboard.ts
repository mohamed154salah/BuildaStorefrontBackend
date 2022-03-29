import Client from "../database";

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsAnActive(
    id: string
  ): Promise<{ product_id: string, price: number, order_id: string }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT order_products.product_id, order_products.quantity,order_products.order_id,orders.status,orders.user_id FROM orders INNER JOIN  order_products ON orders.id = order_products.order_id AND orders.status='active' AND orders.user_id =($1);";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  async productsInClosed(
    id: string
  ): Promise<{ product_id: string, price: number, order_id: string }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT order_products.product_id, order_products.quantity,order_products.order_id,orders.status,orders.user_id FROM orders INNER JOIN  order_products ON orders.id = order_products.order_id AND orders.status='closed' AND orders.user_id =($1);";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}

import Client from "../database";

export type Products = {
  id?: number,
  name: string,
  price: number,
};

export class ProductsStore {
  async index(): Promise<Products[]> {
    const conn = await Client.connect();
    const sql = "SELECT * FROM products;";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async indexTop5(): Promise<{ product_id: number, popular: number }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT order_products.product_id,products.name,SUM (order_products.quantity) AS popular FROM  order_products INNER JOIN products on order_products.product_id=products.id   GROUP BY order_products.product_id ,products.name ORDER BY popular LIMIT 5;	";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get order_products: ${err}`);
    }
  }

  async show(id: number): Promise<Products> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = $1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      if(result.rows.length>0){
      return result.rows[0];
    }else{
      throw new Error();

    }
    } catch (error: unknown) {
      // eslint-disable-next-line prettier/prettier
      throw new Error(error as string);
    }
  }

  async create(products: Products): Promise<Products> {
    const conn = await Client.connect();
    const sql = "INSERT INTO products (name,price) VALUES($1,$2) RETURNING *;";
    const result = await conn.query(sql, [products.name, products.price]);
    conn.release();
    return result.rows[0];
  }

  async destroy(id: number): Promise<Products> {
    const conn = await Client.connect();
    const sql = "DELETE from products WHERE id = ($1);";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
}

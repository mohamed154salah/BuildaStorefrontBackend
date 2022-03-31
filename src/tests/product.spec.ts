import Client from "../database";
import { ProductsStore, Products } from "../models/products";
import supertest from "supertest";
import app from "../index";
// create a request object
const request = supertest(app);

const store = new ProductsStore();
describe("testing product Database model ", () => {

  describe("Product model function defined", () => {
    it("test create function exists", () => {
      expect(store.create).toBeDefined();
    });

    it("test index function exists", () => {
      expect(store.index).toBeDefined();
    });

    it("test show function exists", () => {
      expect(store.show).toBeDefined();
    });

    it("test indexTop5 function exists", () => {
      expect(store.indexTop5).toBeDefined();
    });

    it("test delete function exists", () => {
      expect(store.destroy).toBeDefined();
    });
  });
  describe('test show product', () => {
    const product = {
        name: "phone",
        price: 200,
      // eslint-disable-next-line prettier/prettier
    } as Products;

    beforeAll(async () => {
      const conn = await Client.connect();
      await conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1;")
      conn.release();
      const createProduct = await store.create(product);
      product.id = createProduct.id;
    });

    afterAll(async () => {
      const conn = await Client.connect();
      const sql = "delete from products;";
      await conn.query(sql);
      conn.release();
    });

    it("test show products when get right id", async () => {
      const products = await store.show(product.id as number);
      expect(products?.name).toBeInstanceOf(String);
      expect(products?.id).toBeInstanceOf(Number);
    });
  });
});

 describe("test product api", () => {
    const product = {
        name: "phone",
        price: 200,
      // eslint-disable-next-line prettier/prettier
    } as Products;

    beforeAll(async () => {
      const conn = await Client.connect();
      await conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1;")
      conn.release();
      const createProduct = await store.create(product);
      product.id = createProduct.id;
    });

    afterAll(async () => {
      const conn = await Client.connect();
      const sql = "delete from products;";
      await conn.query(sql);
      conn.release();
    });

  it("test index function work", async () => {
    const res = await request.get('/products')
      .set("Content-Type", "application/json")
      
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  
    it("test show function work", async() => {
      const res = await request.get('/product?id=1')
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object); 
     });   

     it("test show function not work", async() => {
        const res = await request.get('/product?id=100')
        .set("Content-Type", "application/json");
                console.log(res.body)
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object); 
       });   
    })

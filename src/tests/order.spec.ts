import Client from "../database";
import { OrderStore, Order } from "../models/order";
import { UserStore, User } from "../models/user";
import supertest from "supertest";
import app from "../index";
// create a request object
const request = supertest(app);
const Userstore = new UserStore();

const store = new OrderStore();
describe("testing Order Database model ", () => {

  describe("order model function defined", () => {
    it("test create function exists", () => {
      expect(store.create).toBeDefined();
    });

    it("test index function exists", () => {
      expect(store.index).toBeDefined();
    });

    it("test show function exists", () => {
      expect(store.show).toBeDefined();
    });

    it("test delete function exists", () => {
      expect(store.destroy).toBeDefined();
    });
  });
  describe('test show orders', () => {
    const order = {
        status: 'active',
        user_id: 1,
      // eslint-disable-next-line prettier/prettier
    } as Order;

    const user = {
        username: "mosalah",
        password_digest: "password_right"
        // eslint-disable-next-line prettier/prettier
      } as User;

    beforeAll(async () => {
      const conn = await Client.connect();
      await conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1;");
      await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
      conn.release();
      const createUser = await Userstore.create(user);
      const createOrder = await store.create(order);
      order.id = createOrder.id;
      user.id = createUser.id;
    });

    afterAll(async () => {
      const conn = await Client.connect();
      const sql = "delete from orders;";
      await conn.query(sql);
      const sql2 = "delete from users;";
      await conn.query(sql2);
      conn.release();
    });

    it("test show order when get right id", async () => {
      console.log(order.id+"bye")  
      const orders = await store.show(order.id as number);
      expect(orders?.status).toBe("active");
      expect(String(orders?.user_id)).toBe("1");
    });
  });
});

 describe("test order api", () => {
    const order = {
        status: 'active',
        user_id: 1,
      // eslint-disable-next-line prettier/prettier
    } as Order;

    const user = {
        username: "mosalah",
        password_digest: "password_right"
        // eslint-disable-next-line prettier/prettier
      } as User;

    beforeAll(async () => {
      const conn = await Client.connect();
      await conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1;");
      await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
      conn.release();
      const createUser = await Userstore.create(user);
      const createOrder = await store.create(order);
      order.id = createOrder.id;
      user.id = createUser.id;
    });

    afterAll(async () => {
      const conn = await Client.connect();
      const sql = "delete from orders;";
      await conn.query(sql);
      const sql2 = "delete from users;";
      await conn.query(sql2);
      conn.release();
    });

  it("test index function work", async () => {
    const res = await request.get('/orders')
      .set("Content-Type", "application/json")
      
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  
    it("test show function work", async() => {
      const res = await request.get('/order')
      .set("Content-Type", "application/json")
      .send({id:"1"});

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object); 
     });   

     it("test show function not work", async() => {
        const res = await request.get('/product')
        .set("Content-Type", "application/json")
        .send({id:"100"});
        console.log(res.body)
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object); 
       });   
    })

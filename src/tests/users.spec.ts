import Client from "../database";
import { UserStore, User } from "../models/user";
import supertest from "supertest";
import app from "../index";
// create a request object
const request = supertest(app);

const store = new UserStore();
describe("testing user Database model ", () => {

  describe("User model function defined", () => {
    it("test create function exists", () => {
      expect(store.create).toBeDefined();
    });

    it("test index function exists", () => {
      expect(store.index).toBeDefined();
    });

    it("test show function exists", () => {
      expect(store.show).toBeDefined();
    });

    it("test authenticate function exists", () => {
      expect(store.authenticate).toBeDefined();
    });

    it("test delete function exists", () => {
      expect(store.delete).toBeDefined();
    });
  });
  describe('test auth user', () => {
    const user = {
      username: "mosalah",
      password_digest: "password_right"
      // eslint-disable-next-line prettier/prettier
    } as User;

    beforeAll(async () => {
      const conn = await Client.connect();
      await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
      conn.release();
      const createUser = await store.create(user);
      user.id = createUser.id;
    });

    afterAll(async () => {
      const conn = await Client.connect();
      const sql = "delete from users;";
      await conn.query(sql);
      conn.release();
    });

    it("test authenticate user when get right username and password", async () => {
      const authorize = await store.authenticate(user.username, user.password_digest);
      expect(authorize?.password_digest).toBeInstanceOf(String);
      expect(authorize?.id).toBeInstanceOf(Number);
    });

    it("test authenticate user when get wrong username or password", async () => {
      const notAuthorize = await store.authenticate("username", user.password_digest);
      expect(notAuthorize?.password_digest).toBeUndefined();
      expect(notAuthorize?.id).toBeUndefined();
    });
  });
});

describe("test user api", () => {

  const user = {
    username: "mosalah",
    password_digest: "password_right"
    // eslint-disable-next-line prettier/prettier
  } as User;
  let token = "";

  beforeAll(async () => {
    const conn = await Client.connect();
    await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
    conn.release();
    const createUser = await store.create(user);
    user.id = createUser.id;
  });

  afterAll(async () => {
    const conn = await Client.connect();
    const sql = "delete from users";
    await conn.query(sql);
    conn.release()
  });

  it("test authenticate function return token ", async () => {

    const res = await request.post("/users/authenticate")
      .set("Content-Type", "application/json")
      .send({
        username: user.username,
        password: user.password_digest
      });
    token = res.body;
    expect(res.statusCode).toBe(200);

  });

  it("test index function work", async () => {
    const res = await request.get('/users')
      .set("Content-Type", "application/json")
      .set('Authorization', `Bearer ${token}`)
      
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  
    it("test show function work", async() => {
      const res = await request.get('/users?id=1')
      .set("Content-Type", "application/json")
      .set('Authorization', `Bearer ${token}`)
      
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
     });  
})

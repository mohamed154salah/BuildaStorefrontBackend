import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../models/user";
import dotenv from "dotenv";
import authorization from "../middleware/authorization";
dotenv.config();
const userRoutes = (app: express.Application) => {
  app.get("/users", authorization, index);
  app.get("/user", authorization, show);
  app.post("/users", create);
  app.delete("/users",authorization, destroy);
  app.put("/users",authorization,update)
  app.post("/users/authenticate", authenticate);
};
interface JwtPayload {
    id: string
  }
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try{
  const users = await store.index();
  res.json(users);
  }catch(err){
    res.status(404).json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
      // eslint-disable-next-line prettier/prettier
  const user = await store.show(_req.query.id as string);
  res.json(user);
} catch (error) {
  res.status(400);
  // eslint-disable-next-line prettier/prettier
  res.json(error);
}
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password_digest: _req.body.password,
  };
  try {
    const newUser = await store.create(user);
    // eslint-disable-next-line prettier/prettier
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token)
  } catch (err: unknown) {
    res.status(400);
    // eslint-disable-next-line prettier/prettier
    res.json(err as string + user);
  }
};


const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password_digest: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        const {id} =jwt.verify(token, process.env.TOKEN_SECRET as string)as JwtPayload
        if(parseInt( id )!== user.id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(err as string + user)
    }
}


const destroy = async (_req: Request, res: Response) => {
  try {
    
  const deleted = await store.delete(_req.body.id);
  res.json(deleted);
} catch (error) {
  res.status(401)
  res.json(error)

} 

};

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password_digest: _req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password_digest);
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token)
  } catch (err) {
    res.status(401);
    res.json(err as string + user);
  }
};

export default userRoutes;

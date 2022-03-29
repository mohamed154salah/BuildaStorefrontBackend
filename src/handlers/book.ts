import express, { Request, Response } from "express";
import { Book, BookStore } from "../models/book";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const store = new BookStore();

const index = async (_req: Request, res: Response) => {
  const books = await store.index();
  res.json(books);
};

const show = async (_req: Request, res: Response) => {
  const book = await store.show(_req.body.id);
  res.json(book);
};

const create = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization;
    // eslint-disable-next-line prettier/prettier
    const token = (authorizationHeader as string).split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  try {
    const book: Book = {
      title: _req.body.title,
      author: _req.body.author,
      totalPages: _req.body.totalPages,
      summary: _req.body.summary,
    };

    const newBook = await store.create(book);
    res.json(newBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = _req.headers.authorization;
        // eslint-disable-next-line prettier/prettier
        const token = (authorizationHeader as string).split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
      } catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
      }
  const deleted = await store.delete(_req.body.id);
  res.json(deleted);
};

const articleRoutes = (app: express.Application) => {
  app.get("/books", index);
  app.get("/books/:id", show);
  app.post("/books", create);
  app.delete("/books", destroy);
};

export default articleRoutes;

import { Products, ProductsStore } from "../models/products";
import express, { Request, Response } from "express";
import authorization from "../middleware/authorization";
const productsStore = new ProductsStore();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await productsStore.index();
    res.json(product);
  } catch (error) {
    res.status(400).send(`error while get products ${error}`);
  }
};
const getProduct_P = async (_req: Request, res: Response) => {
  try {
    const order = await productsStore.indexTop5();
    res.json(order);
  } catch (error) {
    res.status(400).send(`error while get products ${error}`);
  }
};
const show = async (_req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prettier/prettier
    const product = await productsStore.show(parseInt(_req.query.id as string));
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (_req: Request, res: Response) => {
  try {
    const product: Products = {
      name: _req.body.name,
      price: _req.body.price,
    };

    const newProduct: Products = await productsStore.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
  const deleted = await productsStore.destroy(_req.body.id);
  res.json(deleted);
};

const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/productTop", getProduct_P);
  app.get("/product", show);
  app.post("/product", authorization, create);
  app.delete("/product", destroy);
};

export default productsRoutes;

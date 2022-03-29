import { Order, OrderStore } from "./../models/order";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {
  order_products,
  Order_productsStore,
} from "./../models/order_products";
dotenv.config();
const orderStore = new OrderStore();
const store = new Order_productsStore();
const index = async (_req: Request, res: Response) => {
  try {
    const order = await orderStore.index();
    res.json(order);
  } catch (error) {
    res.status(400).send(`error while get orders ${error}`);
  }
};

const show = async (_req: Request, res: Response) => {
  if (_req.body.id) {
    try {
      const order = await orderStore.show(_req.body.id);
      res.json(order);
    } catch (err) {
      res.status(400).send(`${err}`);
    }
  } else {
    res.status(400).send(`error while get orders no ID added`);
  }
};

const create = async (_req: Request, res: Response) => {
  if (_req.body.status && _req.body.user_id) {
    try {
      const order: Order = {
        status: _req.body.status,
        user_id: _req.body.user_id,
      };

      const newOrder: Order = await orderStore.create(order);
      res.json(newOrder);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  } else {
    res.status(400).json({ message: "you should send status and user_id" });
  }
};

const destroy = async (_req: Request, res: Response) => {
  if (_req.body.id) {
    try {
      const deleted = await orderStore.destroy(_req.body.id);
      res.json(deleted);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  } else {
    res.status(400).json({ message: "you should send id" });
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  const order_product: order_products = {
    order_id: parseInt(orderId),
    product_id: parseInt(productId),
    quantity: quantity,
  };

  try {
    const addedProduct = await store.create(order_product);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//get order_product
const getProduct_order = async (_req: Request, res: Response) => {
  try {
    const order = await store.index();
    res.json(order);
  } catch (error) {
    res.status(400).send(`error while get orders ${error}`);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/order", show);
  app.post("/order", create);
  app.delete("/order", destroy);
  app.get("/or", getProduct_order);
  app.post("/orders/:id/products", addProduct);
};

export default orderRoutes;

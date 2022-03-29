import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import authorization from "../middleware/authorization";
import { DashboardQueries } from "../services/dashboard";

const dashboardRoutes = (app: express.Application) => {
  app.get("/products_in_orders_active/:id", authorization, productsAnActive);
  app.get("/products_in_orders_closed/:id", authorization, productsInClosed);
};

const dashboard = new DashboardQueries();

const productsAnActive = async (_req: Request, res: Response) => {
  const User_id = _req.params.id;
  const products = await dashboard.productsAnActive(User_id);
  res.json(products);
};
const productsInClosed = async (_req: Request, res: Response) => {
  const User_id = _req.params.id;
  const products = await dashboard.productsInClosed(User_id);
  res.json(products);
};
export default dashboardRoutes;

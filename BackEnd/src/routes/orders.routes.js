import express, { Router } from "express";
import { getOrdersController} from "../controller/order.controller.js";


const orderRouter = express.Router();

orderRouter.get("/browse" ,getOrdersController)

export default orderRouter
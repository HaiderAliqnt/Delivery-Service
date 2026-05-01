import express from "express";
import { assignDelivererController, cancelOrderController, createOrderController, getOrdersController, getOrderStatusController, updateOrderStatusController } from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/browse" ,getOrdersController)
orderRouter.post("/create" , createOrderController)
orderRouter.post("/cancel/:orderId", cancelOrderController)
orderRouter.put("/order/:orderId/status", updateOrderStatusController)
orderRouter.post("/order/:orderId/assign-deliverer", assignDelivererController)
orderRouter.get("/order/:orderId", getOrderStatusController)




export default orderRouter
import express from "express";
import { assignDelivererController, cancelOrderController, createOrderController, getDelivererInfoController, getOrdersController, getOrderStatusController, updateOrderStatusController } from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/browse" ,getOrdersController)
orderRouter.post("/create" , createOrderController)
orderRouter.post("/cancel/:orderId", cancelOrderController)
orderRouter.put("/:orderId/status", updateOrderStatusController)
orderRouter.post("/:orderId/assign-deliverer", assignDelivererController)
orderRouter.get("/:orderId", getOrderStatusController)
orderRouter.get("/:orderId/deliverer", getDelivererInfoController);



export default orderRouter
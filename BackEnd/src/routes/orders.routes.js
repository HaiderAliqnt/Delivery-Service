import express from "express";
import {estimateOrder, assignDelivererController, cancelOrderController, createOrderController, getDelivererInfoController, getOrdersController, getOrderStatusController, updateOrderStatusController, getMyOpenOrdersController, getMyOpenDeliveriesController } from "../controller/order.controller.js";


const orderRouter = express.Router();

orderRouter.get("/browse" ,getOrdersController)
orderRouter.post("/create" , createOrderController)
orderRouter.post("/cancel/:orderId", cancelOrderController)
orderRouter.put("/:orderId/status", updateOrderStatusController)
orderRouter.post("/:orderId/assign-deliverer", assignDelivererController)
orderRouter.get("/:orderId", getOrderStatusController)
orderRouter.get("/:orderId/deliverer", getDelivererInfoController);
orderRouter.post('/estimate', estimateOrder);
orderRouter.get('/open/:user_id' ,getMyOpenOrdersController )
orderRouter.get('/open/deliveries/:user_id' , getMyOpenDeliveriesController)
export default orderRouter
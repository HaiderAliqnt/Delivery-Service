import express from "express";
import { getFeedController, claimOrderController, updateOrderStatusController } from "../controller/deliverer.controller.js";

const delivererRouter = express.Router();

delivererRouter.get("/feed", getFeedController);
delivererRouter.post("/claim/:orderId", claimOrderController);
delivererRouter.put("/order/:orderId/status", updateOrderStatusController);

export default delivererRouter;
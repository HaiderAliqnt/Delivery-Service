// routes/batchRoutes.js

import express from "express";

import {
    createBatchController,
    getAvailableBatchesController,
    getBatchDetailsController,
    acceptBatchController,
    startBatchController,
    completeOrderInBatchController
} from "../controller/batch.controller.js";

const Batchrouter = express.Router();


// ======================================================
// CREATE BATCHES
// ======================================================

Batchrouter.post(
    "/create",
    createBatchController
);


// ======================================================
// GET AVAILABLE BATCHES
// ======================================================

Batchrouter.get(
    "/available",
    getAvailableBatchesController
);


// ======================================================
// GET SINGLE BATCH DETAILS
// ======================================================

Batchrouter.get(
    "/:batchId",
    getBatchDetailsController
);


// ======================================================
// ACCEPT BATCH
// ======================================================

Batchrouter.post(
    "/:batchId/accept",
    acceptBatchController
);


// ======================================================
// START BATCH
// ======================================================

Batchrouter.post(
    "/:batchId/start",
    startBatchController
);


// ======================================================
// COMPLETE ORDER INSIDE BATCH
// ======================================================

Batchrouter.post(
    "/orders/:orderId/complete",
    completeOrderInBatchController
);


export default Batchrouter;
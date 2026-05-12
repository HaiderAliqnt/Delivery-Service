// controllers/batchController.js

import {
    createBatches,
    getAvailableBatches,
    getBatchDetails,
    acceptBatch,
    startBatch,
    completeOrderInBatch
} from "../services/batch.service.js"


// ======================================================
// CREATE BATCHES
// ======================================================

export const createBatchController = async (req, res) => {

    try {

        const result = await createBatches();

        return res.status(201).json(result);

    } catch (err) {

        console.error("Create batch controller error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to create batches"
        });
    }
};


// ======================================================
// GET AVAILABLE BATCHES
// ======================================================

export const getAvailableBatchesController = async (
    req,
    res
) => {

    try {

        const batches = await getAvailableBatches();

        return res.status(200).json({
            success: true,
            batches
        });

    } catch (err) {

        console.error("Get batches controller error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch batches"
        });
    }
};


// ======================================================
// GET SINGLE BATCH DETAILS
// ======================================================

export const getBatchDetailsController = async (
    req,
    res
) => {

    try {

        const { batchId } = req.params;

        const batch = await getBatchDetails(batchId);

        return res.status(200).json({
            success: true,
            batch
        });

    } catch (err) {

        console.error("Get batch details controller error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch batch details"
        });
    }
};


// ======================================================
// ACCEPT BATCH
// ======================================================

export const acceptBatchController = async (
    req,
    res
) => {

    try {

        const { batchId } = req.params;

        const { delivererId } = req.body;

        const batch = await acceptBatch(
            batchId,
            delivererId
        );

        return res.status(200).json({
            success: true,
            batch
        });

    } catch (err) {

        console.error("Accept batch controller error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to accept batch"
        });
    }
};


// ======================================================
// START BATCH
// ======================================================

export const startBatchController = async (
    req,
    res
) => {

    try {

        const { batchId } = req.params;

        const batch = await startBatch(batchId);

        return res.status(200).json({
            success: true,
            batch
        });

    } catch (err) {

        console.error("Start batch controller error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to start batch"
        });
    }
};


// ======================================================
// COMPLETE ORDER INSIDE BATCH
// ======================================================

export const completeOrderInBatchController = async (
    req,
    res
) => {

    try {

        const { orderId } = req.params;

        const order = await completeOrderInBatch(orderId);

        return res.status(200).json({
            success: true,
            order
        });

    } catch (err) {

        console.error("Complete order controller error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to complete order"
        });
    }
};
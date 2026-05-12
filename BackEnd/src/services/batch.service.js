// services/batchService.js

import { pool } from "../DB/index.js"
import deliveryGroups from "../config/deliveryGroups.js";


// ======================================================
// HELPERS
// ======================================================

const findGroupForBuilding = (building) => {
    for (const [groupName, groupData] of Object.entries(deliveryGroups)) {
        if (groupData.buildings.includes(building)) {
            return groupName;
        }
    }

    return null;
};

const sortOrdersByRoute = (groupName, orders) => {
    const routeOrder = deliveryGroups[groupName].routeOrder;

    return orders.sort((a, b) => {
        return (
            routeOrder.indexOf(a.delivery_building) -
            routeOrder.indexOf(b.delivery_building)
        );
    });
};


// ======================================================
// CREATE BATCHES
// ======================================================

export const createBatches = async () => {
    try {

        // 1. GET ALL UNBATCHED ORDERS
        const pendingOrders = await pool.query(`
            SELECT *
            FROM orders
            WHERE batch_id IS NULL
            AND status = 'pending'
        `);

        const groupedOrders = {};

        // 2. GROUP ORDERS
        for (const order of pendingOrders.rows) {

            const groupName = findGroupForBuilding(
                order.delivery_building
            );

            if (!groupName) continue;

            if (!groupedOrders[groupName]) {
                groupedOrders[groupName] = [];
            }

            groupedOrders[groupName].push(order);
        }


        // 3. CREATE BATCH FOR EACH GROUP
        for (const [groupName, orders] of Object.entries(groupedOrders)) {

            if (orders.length === 0) continue;

            // SORT ORDERS
            const sortedOrders = sortOrdersByRoute(
                groupName,
                orders
            );

            // CALCULATE TOTAL PRICE
            const totalPrice = sortedOrders.reduce(
                (sum, order) => sum + Number(order.total_price),
                0
            );

            // CREATE BATCH
            const newBatch = await pool.query(`
                INSERT INTO batch
                (
                    groupName,
                    status,
                    total_price
                )
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            [
                groupName,
                'pending',
                totalPrice
            ]);

            const batchId = newBatch.rows[0].batch_id;

            // ASSIGN ORDERS TO BATCH
            for (let i = 0; i < sortedOrders.length; i++) {

                const order = sortedOrders[i];

                await pool.query(`
                    UPDATE orders
                    SET
                        batch_id = $1,
                        delivery_sequence = $2,
                        is_batched = true
                    WHERE order_id = $3
                `,
                [
                    batchId,
                    i + 1,
                    order.order_id
                ]);
            }
        }

        return {
            success: true,
            message: "Batches created successfully"
        };

    } catch (err) {

        console.error("Create batches error:", err);

        throw err;
    }
};


// ======================================================
// GET AVAILABLE BATCHES
// ======================================================

export const getAvailableBatches = async () => {

    try {

        const batches = await pool.query(`
            SELECT *
            FROM batch
            WHERE status = 'pending'
            ORDER BY created_at DESC
        `);

        return batches.rows;

    } catch (err) {

        console.error("Get batches error:", err);

        throw err;
    }
};


// ======================================================
// GET SINGLE BATCH DETAILS
// ======================================================

export const getBatchDetails = async (batchId) => {

    try {

        const batch = await pool.query(`
            SELECT *
            FROM batch
            WHERE batch_id = $1
        `, [batchId]);

        const orders = await pool.query(`
            SELECT *
            FROM orders
            WHERE batch_id = $1
            ORDER BY delivery_sequence ASC
        `, [batchId]);

        return {
            ...batch.rows[0],
            orders: orders.rows
        };

    } catch (err) {

        console.error("Get batch details error:", err);

        throw err;
    }
};


// ======================================================
// ACCEPT BATCH
// ======================================================

export const acceptBatch = async (
    batchId,
    delivererId
) => {

    try {

        const updatedBatch = await pool.query(`
            UPDATE batch
            SET
                deliverer_id = $1,
                status = 'assigned'
            WHERE batch_id = $2
            RETURNING *
        `,
        [
            delivererId,
            batchId
        ]);

        return updatedBatch.rows[0];

    } catch (err) {

        console.error("Accept batch error:", err);

        throw err;
    }
};


// ======================================================
// START BATCH
// ======================================================

export const startBatch = async (batchId) => {

    try {

        const batch = await pool.query(`
            UPDATE batch
            SET
                status = 'in_progress',
                started_at = CURRENT_TIMESTAMP
            WHERE batch_id = $1
            RETURNING *
        `,
        [batchId]);

        return batch.rows[0];

    } catch (err) {

        console.error("Start batch error:", err);

        throw err;
    }
};


// ======================================================
// COMPLETE ORDER
// ======================================================

export const completeOrderInBatch = async (
    orderId
) => {

    try {

        // COMPLETE ORDER
        const updatedOrder = await pool.query(`
            UPDATE orders
            SET status = 'delivered'
            WHERE order_id = $1
            RETURNING *
        `,
        [orderId]);

        const order = updatedOrder.rows[0];

        // CHECK IF BATCH FINISHED
        const remainingOrders = await pool.query(`
            SELECT *
            FROM orders
            WHERE batch_id = $1
            AND status != 'delivered'
        `,
        [order.batch_id]);

        // COMPLETE BATCH
        if (remainingOrders.rows.length === 0) {

            await pool.query(`
                UPDATE batch
                SET status = 'completed'
                WHERE batch_id = $1
            `,
            [order.batch_id]);
        }

        return updatedOrder.rows[0];

    } catch (err) {

        console.error("Complete order error:", err);

        throw err;
    }
};
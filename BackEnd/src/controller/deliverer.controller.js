import { getOpenOrdersService, claimOrderService, updateOrderStatusService } from "../services/orders.services.js";

export const getFeedController = async (req, res) => {
    try {
        const orders = await getOpenOrdersService();
        res.json(orders);
    } catch (err) {
        console.error('Error fetching feed:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const claimOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        // For now, using a default deliverer_id (you'll want to get this from session/auth)
        const deliverer_id = 1;
        
        const order = await claimOrderService(orderId, deliverer_id);
        
        res.json({
            success: true,
            order_id: order.order_id,
            status: order.status,
            message: 'Order claimed successfully'
        });
    } catch (err) {
        console.error('Error claiming order:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};

export const updateOrderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        
        const order = await updateOrderStatusService(orderId, status);
        
        res.json({
            success: true,
            order_id: order.order_id,
            status: order.status,
            message: 'Status updated successfully'
        });
    } catch (err) {
        console.error('Error updating status:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};
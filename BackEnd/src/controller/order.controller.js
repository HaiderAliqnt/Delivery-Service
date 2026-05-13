import { getMyOpenOrdersService, assignDelivererService, cancelOrderService, createOrderService , getDelivererInfoService, getOpenOrdersService, getOrderStatusService, updateOrderStatusService,getMyOpenDeliveriesService } from "../services/orders.services.js";
import { createBatches } from "../services/batch.service.js";
import { parseOrderText } from '../services/orderParser.service.js';
import { getAllProductsWithAliases } from '../models/product.model.js';

export const createOrderController = async (req, res) => {
    try {
        console.log("Order data received by controller:", req.body);

        const order = await createOrderService(req.body);

        await createBatches();

        res.status(201).json({
            success: true,
            order
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};



export const getOrderStatusController = async(req,res) =>{
    try {
        
        const {orderId} = req.params;

        console.log("Order ID received by controller:", orderId);

        const order_status = await getOrderStatusService(orderId);

        res.status(201).json({
            success: true,
            order_status
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }

}

export const cancelOrderController = async(req,res) => {
    try{
        
        const {orderId} = req.params;

        console.log("Order ID received by controller to cancel:", orderId);


        const order_cancelled = await cancelOrderService(orderId);

        res.status(201).json({
            success: true,
            order_cancelled
        });

    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const updateOrderStatusController = async(req,res)=>{
    try{
        
        
        const { orderId } = req.params;
        const { status } = req.body;

        
        console.log("Order id and new status recieved by controller:", orderId,status);

        const order_updated = await updateOrderStatusService(orderId, status);

        res.status(201).json({
            success: true,
            order_updated
        });

    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const assignDelivererController = async(req,res)=>{
    try{
        
        const { orderId } = req.params;
        const { deliverer_id } = req.body;

        
        
        console.log("Order id and assigned deliverer id recieved by controller:", orderId , deliverer_id);

        const assigned_deliver = await assignDelivererService(orderId, deliverer_id);


        res.status(201).json({
            success: true,
            assigned_deliver
        });

    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const getDelivererInfoController = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const deliverer_info = await getDelivererInfoService(orderId);

        res.status(200).json({
            success: true,
            deliverer_info
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

export const getMyOpenOrdersController = async (req,res) => {

    try {

       
        const { user_id } = req.params;
        
        const result = await getMyOpenOrdersService(user_id);

        return res.status(200).json(result);

    } catch (err) {

        console.error(
            "Get open orders controller error:",
            err
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch open orders"
        });
    }
};

export const getMyOpenDeliveriesController = async(req,res) => {
    try {

       const { user_id } = req.params;
        
        const result = await getMyOpenDeliveriesService(user_id);

        return res.status(200).json(result);

    } catch (err) {

        console.error(
            "Get open orders controller error:",
            err
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch open orders"
        });
    }
}



export const getOrdersController = async (req , res) => {

    try {
        const {location} = req.query
        // const user = req.user?.role

        if(!location){
            return res.status(400).json({error : "location is required"})
        }

        const orders = await getOpenOrdersService(location);

        res.json(orders)


    }catch(err){
        res.status(500).json({error : err.message})
    }

}



export const estimateOrder = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Order text is required' });
        }

        const products = await getAllProductsWithAliases();
        const result = parseOrderText(text, products);

        res.status(200).json(result);
    } catch (err) {
        console.error('Error estimating order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
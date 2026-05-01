import { assignDelivererService, cancelOrderService, createOrderService , getOpenOrdersService, getOrderStatusService, updateOrderStatusService } from "../services/orders.services.js";


export const createOrderController = async (req, res) => {
    try {
        console.log("Order data received by controller:", req.body);

        const order = await createOrderService(req.body);

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
import { updateOrderStatus,assignDeliverer, createOrder, getOpenOrders, getOrderById, getOrderStatus ,getDelivererInfo} from "../models/order.models.js"

export const createOrderService = async(order_data) =>{

    try{
        const{
            customer_id,
            pickup_location,
            delivery_room,
            delivery_hostel,
            special_instructions,
            total_price
        } = order_data

        if(!customer_id){
            throw new Error("Customer ID is invalid")
        }
        if(!pickup_location){
            throw new Error("Pickup location is required")
        }
         if (!delivery_hostel) {
            throw new Error("Delivery details are required");
        }

        if (!total_price || total_price <= 0) {
            throw new Error("Invalid total price");
        }

        const deliverer_id = null; // no deliverer assigned yet
        const status = "open";

         const newOrder = await createOrder(
            customer_id,
            deliverer_id,
            pickup_location,
            delivery_hostel,
            delivery_room,
            special_instructions,
            total_price,
            status
        );

        return newOrder;

    }catch(err){
        throw new Error(err.message)
    }
}


export const getOrderStatusService = async(order_id) => {
    try{
        if(!order_id){
            throw new Error("Order ID missing...can not filter for service")
        }
        const order_status = await getOrderStatus(order_id);

        return order_status;
    }catch(err){
        throw new Error(err.message)
    }

}

export const updateOrderStatusService = async(order_id , status) =>{

    try{
        if(!order_id){
            throw new Error("Order ID missing...can not filter for service")
        }
        if(!status){
            throw new Error("Status missing...service doesnot know the update value")
        }
        const result = await updateOrderStatus(order_id , status);

        return result;
    }catch(err){
        throw new Error(err.message)
    }
}

export const assignDelivererService = async(order_id ,deliverer_id) =>{
    
    try{
        if(!order_id){
            throw new Error("Order ID missing...can not filter for deliverer assignment")
        }

        if(!deliverer_id){
            throw new Error("Deliverer ID missing...can not assign a null value")
        }

        
        const result = await assignDeliverer(order_id,deliverer_id);

        return result;
    }catch(err){
        throw new Error(err.message)
    }

}

export const getOrderByIdService = async(order_id) =>{
    try{
        if(!order_id){
            throw new Error("Order ID missing...can not filter for service")
        }
        const result = await getOrderById(order_id);

        return result;
    }catch(err){
        throw new Error(err.message)
    }
}

export const cancelOrderService = async(order_id) =>{

    try{
        if(!order_id){
            throw new Error("Order ID missing...can not cancel")
        }
        const status = 'cancelled';
        const result = await updateOrderStatus(order_id , status);

        return result;
    }catch(err){
        throw new Error(err.message)
    }
}

export const getDelivererInfoService = async (order_id) => {
    if (!order_id) {
        throw new Error("Order ID missing");
    }

    const result = await getDelivererInfo(order_id);

    if (!result) {
        throw new Error("Order not found");
    }

    return result;
};

//FOR THE DELIVERER
export const getOpenOrdersService = async(location) =>{
    
    if(!location){
        throw new Error ("Location is required")
    }

    return await getOpenOrders(location);
    
}


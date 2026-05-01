import { getOpenOrders } from "../models/order.models.js"

export const getOpenOrdersService = async(location) =>{
    
    if(!location){
        throw new Error ("Location is required")
    }

    return await getOpenOrders(location);
    
}
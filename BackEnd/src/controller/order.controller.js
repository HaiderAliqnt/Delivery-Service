import { getOpenOrdersService } from "../services/orders.services.js";

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
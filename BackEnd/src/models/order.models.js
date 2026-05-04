import { pool } from '../DB/index.js'
import orderRouter from '../routes/orders.routes.js';


//FUNCTION TO CREATE ORDERS TABLE
export const createOrdersTable = async()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                order_id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
                deliverer_id INT REFERENCES users(user_id) ON DELETE SET NULL,
                pickup_location VARCHAR(255) NOT NULL ,
                delivery_hostel VARCHAR(255) NOT NULL,
                delivery_room VARCHAR(255),
                special_instructions VARCHAR(255),
                total_price NUMERIC(10,2) NOT NULL,
                status VARCHAR(20) NOT NULL CHECK(status IN ('open','claimed','picked_up','in_progress','delivered','cancelled')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)
        console.log("Orders table created succesfully")
    }
    catch(err){
        console.error("Error creating orders table" , err);
    }
}

//FUNCTION TO CREATE ORDER

export const createOrder = async(customer_id , deliverer_id , pickup_location ,delivery_hostel,delivery_room ,special_instructions,total_price,status)=>{
    try{
        
        console.log("Model createOrder recieved:" ,{customer_id , deliverer_id , pickup_location ,delivery_hostel,delivery_room ,special_instructions,total_price,status})

        const result = await pool.query(`
            INSERT INTO orders(customer_id , deliverer_id , pickup_location ,delivery_hostel,delivery_room ,special_instructions,total_price,status)
            VALUES($1 , $2 , $3 , $4 , $5 ,$6 ,$7, $8)
            RETURNING *
        `, [customer_id , deliverer_id , pickup_location , delivery_hostel , delivery_room , special_instructions , total_price , status]);
        console.log("order created")
        return result.rows[0];
    }catch(err){
        console.error("Error creating order" , err)
    }
}


export const displayAllOrders = async () =>{

    const result = await pool.query(`
        SELECT * FROM orders
    `)
    return result.rows;
};



export const getOpenOrders = async(location) => { 
    const result = await pool.query(`
        SELECT o.*, u.name as customer_name 
        FROM orders o
        LEFT JOIN users u ON o.customer_id = u.user_id
        WHERE o.status = 'open'
          AND o.pickup_location ILIKE $1
        ORDER BY o.created_at DESC
    `, [`%${location}%`]);

    return result.rows;
};


export const updateOrderStatus = async(order_id , update)=> {
    const result = await pool.query(`
        UPDATE orders
        SET status = $2
        WHERE order_id = $1
        RETURNING *
    `, [order_id , update]);

    return result.rows[0];
}


export const getOrderStatus = async(order_id) => {
    const result = await pool.query(`
        SELECT o.*, d.name AS deliverer_name
        FROM orders o
        LEFT JOIN users d ON o.deliverer_id = d.user_id
        WHERE o.order_id = $1
    `,[order_id]);

    return result.rows[0];
}


export const getOrderById = async(order_id) => {
    const result = await pool.query(`
        SELECT o.*
        FROM orders o
        WHERE o.order_id = $1    
        
    `, [order_id])

    return result.rows[0]
}


export const assignDeliverer = async(order_id , deliverer_id) => {
    const result = await pool.query(`
        UPDATE orders
        SET deliverer_id = $2,
            status ='claimed'
        WHERE order_id = $1
            AND status = 'open'
        RETURNING *
    `, [order_id , deliverer_id]);

    return result.rows[0];
}

export const getDelivererInfo = async (order_id) => {
    const result = await pool.query(`
        SELECT 
            o.order_id,
            o.status,
            u.name AS deliverer_name,
            u.rating AS deliverer_rating,
            u.phone_number AS deliverer_phone
        FROM orders o
        LEFT JOIN users u 
            ON o.deliverer_id = u.user_id
        WHERE o.order_id = $1
    `, [order_id]);

    return result.rows[0];
};











import { pool } from '../DB/index.js'


//FUNCTION TO CREATE ORDERS TABLE
export const createOrdersTable = async()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                order_id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
                deliverer_id INT REFERENCES users(user_id) ON DELETE SET NULL,
                pickup_location VARCHAR(255) NOT NULL CHECK(pickup_location IN ('General_Store','Tuc','Main Gate','TKR','KB' ,'AMK' ,'BBF')),
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

//
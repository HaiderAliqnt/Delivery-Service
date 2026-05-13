import { pool } from '../DB/index.js';

export const createRatingTable = async()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS rating(
                rating_id SERIAL PRIMARY KEY,
                order_id INT REFERENCES orders(order_id)NOT NULL,
                reviewer_id INT REFERENCES users(user_id) NOT NULL,
                reviewee_id INT REFERENCES users(user_id) NOT NULL,
                score INT,
                feedback VARCHAR(100)
            );
        
        `)
    }catch(err){
        console.error("Error creating rating table" , err)
    }
}

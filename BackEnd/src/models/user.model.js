import { pool } from '../DB/index.js'
import bycrypt from 'bcrypt'


//FUNCTION FOR CREATING USER TABLE
export const createUserTable = async () => {

    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone_number INT(11) NOT NULL,
                role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'deliverer')),
                rating VARCHAR(50) NOT NULL CHECK (rating IN ('True Delieverer', 'High Tier Delieverer', 'Middle Tier Delieverer', 'Low Tier Delieverer', 'Basic Delieverer')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)
        console.log("User table created successfully")
    }
    catch(err){
        console.error("Error creating user table", err)
    }
}

//FUNCTION FOR CREATING A NEW USER

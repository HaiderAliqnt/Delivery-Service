import { pool }  from '../DB/index.js'
import bycrypt from 'bcrypt'


//FUNCTION FOR CREATING USER TABLE
export const createUserTable = async () => {

    try{
       await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'deliverer')),
            rating VARCHAR(50) NOT NULL CHECK (
                rating IN (
                    'True Deliverer',
                    'High Tier Deliverer',
                    'Middle Tier Deliverer',
                    'Low Tier Deliverer',
                    'Basic Deliverer'
                )
            ),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
    `)
        console.log("User table created successfully")
    }
    catch(err){
        console.error("Error creating user table", err.message)
    }
}

//FUNCTION FOR CREATING A NEW USER
export const createUser = async (name, password, phone_number, role, rating = 'Basic Deliverer') => {
    
    console.log("Model createUser received:", { name, password, phone_number, role, rating });
    
    const result = await pool.query(`
        INSERT INTO users (name, password, phone_number, role, rating)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [name, password, phone_number, role, rating]);
    console.log("User created successfully");  
    return result.rows[0];
};

//FUNCTION TO FIND USER BY ID
export const findUserByUserId= async(user_id) => {
    
     const result = await pool.query(`
        SELECT * FROM users 
        WHERE user_id = $1 
        `,[user_id]
    );
    return result.rows[0];
    
}

//FUNCTION TO FIND USER BY PHONE NUM
export const findUserByPhoneNum = async(phone_number) => {
    
    const result = await pool.query(`
        SELECT * FROM users 
        WHERE phone_number = $1 
        `,[phone_number]
    );
    return result.rows[0];
}

//FUNTION TO FIND USER BY ROLE
export const findUsersByRole = async(role) => {
   
    const result = await pool.query(`
        SELECT * FROM users 
        WHERE role = $1 
        `,[role]
    );
    return result.rows;
}

//FUNCTION TO FIND USER BY RATING
export const findUsersByRating = async(rating) => {
   
    const result = await pool.query(`
        SELECT * FROM users 
        WHERE role = $1 
        `,[rating]
    );
    return result.rows;
}

//FUNCTION TO UPDATE USER ROLE BY USER ID
export const updateUserRole = async(new_role , phone_number) => {
    
    const result  = await pool.query(`
        UPDATE users 
        SET role = $1
        WHERE phone_number = $2
        `,[new_role,phone_number]
    );
    return result.rows[0];
    
} 

//FUNCTION TO DISPLAY AVAILABLE USERS












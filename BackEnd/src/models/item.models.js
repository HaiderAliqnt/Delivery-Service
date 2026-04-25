import { pool } from '../DB/index.js'

//FUNCTION TO CREATE ITEMS TABLE
export const createItemsTable = async()=>{

    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS items(
                
            
            );

            
        `);
    }
    catch(err){
        console.errror()
    }

}
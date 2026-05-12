import {pool} from '../DB/index.js'

export const createBatchTable = async()=>{
    try{
            await pool.query(`
              CREATE TABLE IF NOT EXISTS batch(
                batch_id SERIAL PRIMARY KEY,
                groupName VARCHAR(20),
                status VARCHAR(20),
                deliverer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
                started_at TIMESTAMP,
                current_location VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                total_price NUMERIC(10,2)NOT NULL
            );  
        `)
        console.log("Batch Table created succesfully")
    }catch(err){
        console.error("Error creating batch table" , err);
    }
}

//HELPER FUNCTIONS

export const isSearching = async(batch_id) => {
    const result = await pool.query(`
        SELECT b.status 
        FROM batch b 
        WHERE b.batch_id = $1;
    `,[batch_id])

    if (result == 'searching'){
        return true;
    }
    else{
        return false;
    }
};



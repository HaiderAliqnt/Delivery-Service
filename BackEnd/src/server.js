import express from "express";
import cors from "cors";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { pool } from "./DB/index.js"
import { createUserTable } from "./models/user.model.js";
import { createOrdersTable } from "./models/order.models.js";
import { createProductTables } from "./models/product.model.js";
import { createBatchTable } from "./models/batch.models.js";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/orders.routes.js";
import Batchrouter from "./routes/batch.routes.js";
import { createRatingTable } from "./models/rating.model.js";


const app = express();

const PORT = 8000;

//MIDDLEWARE
app.use(cors())
app.use(express.json())


//POSTGRESS SESSION SETUP
const PgSession = pgSession(session);

const sessionStore = new PgSession({
    pool: pool, // Reuse your pg Pool
    tableName: "session"
})

app.use(
    session({
        store:sessionStore,
        secret:"we_are_gay",
        resave:false,
        saveUninitialized:false,
        cookie:{secure:false}
    })
)

//STARTS THE SERVER
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});



//TABLE CREATIONS


await createUserTable()
    .then(()=>console.log("Users table created successfully"))
    .catch((error)=>console.log("Error creating Users table" , error.message))

await createOrdersTable()
    .then(()=>console.log("Orders table created succesfully"))
    .catch((error)=>console.log("Error creating orders table" ,error.message))

await createProductTables()
    .then(()=>console.log("Stores , products , and aliases table created successfully"))
    .catch((error)=>console.log("Error creating the product related tables " ,error.message))

await createBatchTable()
    .then(()=>console.log("batch table created successfully"))
    .catch((error)=>console.log("Error creating batch table " ,error.message))

await createRatingTable()
    .then(()=>console.log("rating table created successfully"))
    .catch((err)=>console.log("error creating rating table " ,err.message))
// ROUTES
app.use("/user" , userRouter);
app.use("/order" , orderRouter);
app.use("/batches", Batchrouter);
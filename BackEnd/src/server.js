import express from "express";
import cors from "cors";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { pool } from "./DB/index.js"
import { createUserTable } from "./models/user.model.js";
import { createOrdersTable } from "./models/order.models.js";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/orders.routes.js";

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



// ROUTES
app.use("/user" , userRouter);
app.use("/order" , orderRouter)
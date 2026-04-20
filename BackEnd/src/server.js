import express from "express";
import cors from "cors";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";


const PORT = 8000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

const sessionStore = new PgSession({
    pool: pool, // Reuse your pg Pool
    tableName: "session"
})



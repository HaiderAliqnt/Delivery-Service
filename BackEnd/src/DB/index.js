import {DB_NAME} from "../constants.js";
import express from express;
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "DBUSER123",
    database: GIKGO_DEMO,
    idleTimeoutMillis: 30000
});

export { pool };
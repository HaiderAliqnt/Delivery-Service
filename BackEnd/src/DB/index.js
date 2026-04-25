import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "DBUser123",
    database: "gikgo_demo",
    idleTimeoutMillis: 30000
}); 

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("DB connected:", res.rows[0]);
  }
});

export { pool };



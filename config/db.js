import mysql from "mysql2";
import env from "dotenv";

env.config();

const db = mysql.createConnection({
  host: process.env.SERVER,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default db.promise();

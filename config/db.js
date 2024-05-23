import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "paras23082011",
  database: "dx_montir",
});

export default db.promise();

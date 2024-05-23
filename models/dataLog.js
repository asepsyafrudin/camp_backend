import db from "../config/db.js";

export const createDataLogModels = async (data) => {
  // Construct the SQL query to insert a new user into the m_users table.
  const query = `insert into t_monitoring (
        plant_id,
        ph,
        temperature,
        humidity,
        create_by,
        update_by,
        flag) 
        VALUES (
        ${data.plant_id},
        ${data.ph},
        ${data.temperature},
        ${data.humidity},
        '${data.create_by}',
        '${data.update_by}',
         ${1}
    )`;
  // Execute the query and return the result.
  return db.execute(query);
};

export const getDataLogModels = async (plant_id) => {
  const query = `SELECT * FROM t_monitoring where plant_id = ${plant_id} order by id desc LIMIT 500;`;
  return db.execute(query);
};

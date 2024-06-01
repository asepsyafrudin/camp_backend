import db from "../config/db.js";

/**
 * Inserts a new plant into the m_plant table.
 *
 * @param {Object} data - The data of the plant to be inserted.
 * @param {string} data.plant_id - The ID of the plant.
 * @param {string} data.plant_name - The name of the plant.
 * @param {string} data.create_by - The user who created the plant.
 * @param {string} data.update_by - The user who updated the plant.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const createPlantModels = async (data) => {
  // Construct the SQL query to insert a new plant into the m_plant table.
  // The flag is set to 1 (active) and status is set to 0 (not active) by default.
  const query = `
    INSERT INTO m_plant (plant_id, plant_name, create_by, update_by, flag, status) 
    VALUES (
      '${data.plant_id}',
      '${data.plant_name}', 
      '${data.create_by}', 
      '${data.update_by}', 
      1, 
      0
    )
  `;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Retrieves all plants from the m_plant table where the flag is set to 1.
 *
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const getPlantModels = async () => {
  // Construct the SQL query to retrieve all plants from the m_plant table where the flag is set to 1.
  const query = `
    SELECT * 
    FROM m_plant 
    WHERE flag = 1 -- Filter plants with flag set to 1 (active plants)
  `;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Updates a plant in the m_plant table.
 *
 * @param {Object} data - The data to update the plant with.
 * @param {string} data.plant_name - The new name of the plant.
 * @param {string} data.update_by - The user who is updating the plant.
 * @param {number} data.id - The ID of the plant to update.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const updatePlantModels = async (data) => {
  // Construct the SQL query to update the plant in the m_plant table.
  const query = `UPDATE m_plant SET 
    plant_name = '${data.plant_name}',
    update_by = '${data.update_by}'
    WHERE id = ${data.id}`;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Deletes a plant by setting its flag to '0' in the database.
 *
 * @param {number} id - The ID of the plant to delete.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const deletePlantModels = async (id) => {
  // Construct the SQL query to delete a plant by setting its flag to '0'.
  const query = `UPDATE m_plant SET flag = ${0} WHERE id = ${id}`;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Activates a plant by setting its status to '1' in the database.
 *
 * @param {number} id - The ID of the plant to activate.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const activePlantModels = async (id) => {
  // Construct the SQL query to activate a plant by setting its status to '1'.
  const query = `UPDATE m_plant SET status = ${1} WHERE id = ${id}`;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Deactivates a plant by setting its status to '0' in the database.
 *
 * @param {number} id - The ID of the plant to deactivate.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const deActivePlantModels = async () => {
  // Construct the SQL query to deactivate a plant by setting its status to '0'.
  // The WHERE clause is intentionally omitted, as we want to deactivate all plants.
  const query = `
    UPDATE m_plant
    SET status = ${0}
  `;

  // Execute the query and return the result.
  return db.execute(query);
};

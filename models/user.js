import db from "../config/db.js";

/**
 * Inserts a new user into the m_users table.
 *
 * @param {Object} data - The data of the user to be inserted.
 * @param {string} data.name - The name of the user.
 * @param {string} data.email - The email of the user.
 * @param {string} data.password - The password of the user.
 * @param {string} data.filename - The photo of the user.
 * @param {number} data.role - The role of the user.
 * @param {string} data.company - The company of the user.
 * @param {string} [data.create_by="users"] - The user who created the user.
 * @param {string} [data.update_by="users"] - The user who updated the user.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const createUserModels = (data) => {
  // Construct the SQL query to insert a new user into the m_users table.
  const query = `INSERT INTO m_users
    (name,
    email,
    password,
    photo,
    role,
    company,
    create_by,
    update_by,
    flag)
    VALUES
    ('${data.name}',
    '${data.email}',
    '${data.password}',
    '${data.filename}',
     ${1},
    '${data.company}',
    '${data.create_by ? data.create_by : "users"}',
    '${data.update_by ? data.create_by : "users"}',
     ${1})`;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Retrieves a user from the m_users table by email and role.
 *
 * @param {string} email - The email of the user to retrieve.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const findUsersByEmailModels = (email) => {
  // Construct the SQL query to retrieve a user from the m_users table by email and role.
  const query = `
    SELECT * 
    FROM m_users 
    WHERE email = '${email}' 
    AND role != 0`;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Retrieves a user from the m_users table by email and role.
 *
 * @param {string} email - The email of the user to retrieve.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const findUsersByEmailAndApproveModels = (email) => {
  // Construct the SQL query to retrieve a user from the m_users table by email and role.
  const query = `
    SELECT * 
    FROM m_users 
    WHERE email = '${email}' AND role = 2
  `;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Retrieves all users from the m_users table where the role is not 0.
 *
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const getAllUsersModels = () => {
  // Construct the SQL query to retrieve all users from the m_users table where the role is not 0.
  const query = `select * from m_users where role != 0 `;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Updates a user in the m_users table.
 *
 * @param {Object} data - The data to update the user with.
 * @param {string} data.name - The new name of the user.
 * @param {string} data.email - The new email of the user.
 * @param {string} data.password - The new password of the user.
 * @param {string} filename - The new photo of the user.
 * @param {number} data.role - The new role of the user.
 * @param {string} data.company - The new company of the user.
 * @param {string} data.update_by - The user who is updating the user.
 * @param {number} data.id - The ID of the user to update.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const updateUsersModels = (data, filename) => {
  // Construct the SQL query to update the user in the m_users table.
  const query = `UPDATE m_users
    SET name = '${data.name}',
    email = '${data.email}',
    password = '${data.password}',
    photo = '${filename}',
    role = ${data.role},
    company = '${data.company}',
    update_by = '${data.update_by}',
    flag = ${1}
    WHERE id = ${data.id}`;

  // Execute the query and return the result.
  return db.execute(query);
};

/**
 * Deletes a user from the m_users table by setting their role to 0.
 *
 * @param {number} id - The ID of the user to delete.
 * @return {Promise<Array>} A promise that resolves to an array containing the result of the database query.
 */
export const deleteUserModels = (id) => {
  // Construct the SQL query to delete a user from the m_users table by setting their role to 0.
  const query = `
    UPDATE m_users
    SET role = ${0} -- Set the role to 0 to indicate that the user is deleted.
    WHERE id = ${id} -- Specify the ID of the user to delete.
  `;

  // Execute the query and return the result.
  return db.execute(query);
};

export const approveUsersModels = (id) => {
  const query = `update m_users SET role = ${2} WHERE id = ${id}`;
  return db.execute(query);
};

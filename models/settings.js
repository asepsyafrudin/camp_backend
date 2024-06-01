import db from "../config/db.js";

export const getSettingsModels = async () => {
  const query = `SELECT * FROM m_settings where flag = 1;`;
  return db.execute(query);
};

export const updateSettingsModels = async (data) => {
  const query = `UPDATE m_settings SET status = ${data.status} WHERE id = ${data.id}`;
  return db.execute(query);
};

export const updateByDeviceSettingModels = async (data) => {
  const query = `UPDATE m_settings SET status = ${data.status} WHERE settings_id = ${data.id}`;
  return db.execute(query);
};

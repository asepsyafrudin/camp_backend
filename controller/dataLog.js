import { createDataLogModels, getDataLogModels } from "../models/dataLog.js";
import { getPlantModels } from "../models/plant.js";

/**
 * Creates a new data log in the database.
 *
 * @param {Object} req - The request object containing the data log data.
 * @param {Object} req.body - The data log data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the data log is created.
 */
export const createDataLog = async (req, res) => {
  try {
    // Create a new data log in the database using the data from the request body.
    await createDataLogModels(req.body);

    // Return a success response with the data log data.
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: req.body.plant_id,
    });
  } catch (error) {
    // If an error occurs, return an error response.
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

/**
 * Retrieves the data log from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the data log is retrieved.
 */
export const getDataLog = async (req, res) => {
  try {
    // Execute the query to retrieve the data log from the database.

    const [plant] = await getPlantModels();
    let plant_id;

    if (plant.length > 0) {
      let plant_data = plant.find((value) => value.status === 1);
      plant_id = plant_data.plant_id;
    }

    const [result] = await getDataLogModels(plant_id);

    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        result[index]["plant_name"] = plant.find(
          (item) => item.plant_id === result[index].plant_id
        ).plant_name;
      }
    }

    console.log;

    const sortedAsc = result.sort(function (a, b) {
      return a.id - b.id;
    });
    // Return the retrieved data log as a JSON response.
    res.status(200).json({
      msg: "Data Berhasil di Ambil", // Success message
      data: sortedAsc, // The retrieved data log
    });
  } catch (error) {
    // If an error occurs, return an error response.
    res.status(400).json({
      msg: "Penarikan Data Gagal", // Error message
      errMsg: error, // The error message
    });
  }
};

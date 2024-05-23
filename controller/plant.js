import {
  activePlantModels,
  createPlantModels,
  deActivePlantModels,
  deletePlantModels,
  getPlantModels,
  updatePlantModels,
} from "../models/plant.js";

export const createPlant = async (req, res) => {
  try {
    await createPlantModels(req.body);
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const getPlant = async (req, res) => {
  try {
    const [result] = await getPlantModels();
    res.status(200).json({
      msg: "Data Berhasil di Ambil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Penarikan Data Gagal",
      errMsg: error,
    });
  }
};

export const updatePlant = async (req, res) => {
  try {
    const result = await updatePlantModels(req.body);
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const deletePlant = async (req, res) => {
  try {
    const result = await deletePlantModels(req.params.id);
    res.status(200).json({
      msg: "Data Berhasil di delete",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Data gagal di hapus",
      errMsg: error,
    });
  }
};

export const activePlant = async (req, res) => {
  try {
    await deActivePlantModels();
    await activePlantModels(req.params.id);
    res.status(200).json({
      msg: "Data Berhasil di delete",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Data gagal di active",
      errMsg: error,
    });
  }
};

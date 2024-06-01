import {
  getSettingsModels,
  updateByDeviceSettingModels,
  updateSettingsModels,
} from "../models/settings.js";

export const getSettings = async (req, res) => {
  try {
    const [result] = await getSettingsModels();
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

export const updateSettings = async (req, res) => {
  try {
    await updateSettingsModels(req.body);
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

export const updateByDeviceSettings = async (req, res) => {
  try {
    await updateByDeviceSettingModels(req.body);
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

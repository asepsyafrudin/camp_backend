import express from "express";
import {
  getSettings,
  updateByDeviceSettings,
  updateSettings,
} from "../controller/settings.js";
import { authLog } from "../middleware/authLog.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/getMasterSetting", auth, getSettings);
router.get("/getMasterSettingForArduino", authLog, getSettings);
router.put("/update", auth, updateSettings);
router.put("/updateByDevice", authLog, updateByDeviceSettings);

export default router;

import express from "express";
import { getSettings, updateSettings } from "../controller/settings.js";

const router = express.Router();

router.get("/getMasterSetting", getSettings);
router.put("/update", updateSettings);

export default router;

import express from "express";
import { createDataLog, getDataLog } from "../controller/dataLog.js";
import { authLog } from "../middleware/authLog.js";

const router = express.Router();

router.post("/create", authLog, createDataLog);
router.get("/getDataLog", getDataLog);

export default router;

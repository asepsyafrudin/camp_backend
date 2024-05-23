import express from "express";
import { createDataLog, getDataLog } from "../controller/dataLog.js";

const router = express.Router();

router.post("/create", createDataLog);
router.get("/getDataLog", getDataLog);

export default router;

import express from "express";
import {
  activePlant,
  createPlant,
  deletePlant,
  getPlant,
  updatePlant,
} from "../controller/plant.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createPlant);
router.get("/getMasterPlant", getPlant);
router.delete("/delete/:id", auth, deletePlant);
router.put("/update", auth, updatePlant);
router.put("/active/:id", auth, activePlant);

export default router;

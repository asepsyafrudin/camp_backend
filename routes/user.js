import express from "express";
import multer from "multer";

import {
  approveUsers,
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../controller/user.js";

import { diskStorageProfile } from "../config/multer.js";
import { auth } from "../middleware/auth.js";

const upload = multer({ storage: diskStorageProfile });
const router = express.Router();

router.post("/create", upload.single("photo"), createUser);
router.get("/getUsers", auth, getAllUser);
router.put("/update_user", upload.single("photo"), auth, updateUser);
router.delete("/delete_user/:id", auth, deleteUser);
router.put("/approve/:id", auth, approveUsers);
export default router;

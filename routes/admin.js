import express from "express";
import { getAdminReport } from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAdminReport);

export default router;
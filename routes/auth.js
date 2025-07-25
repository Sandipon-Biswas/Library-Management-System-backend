import express from "express";
import { register, login,getMe } from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";
const router = express.Router();


router.post("/register", register);


router.post("/login", login);
router.get("/me", verifyToken , getMe); 
export default router;
import express from "express";
import { getMyIssues, issueBook, returnBook } from "../controllers/issueController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, issueBook);
router.put("/return/:id", verifyToken, returnBook);
router.get("/my", verifyToken, getMyIssues);

export default router;
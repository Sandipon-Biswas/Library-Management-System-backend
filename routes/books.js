import express from "express";
import {
  addBook,
  getBooks,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";
import { verifyToken, isLibrarianOrAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, isLibrarianOrAdmin, addBook);
router.get("/", getBooks);
router.put("/:id", verifyToken, isLibrarianOrAdmin, updateBook);
router.delete("/:id", verifyToken, isLibrarianOrAdmin, deleteBook);

export default router;
// src/routes/bookRoutes.ts
import express from "express";
import {
  getBooks,
  createBook,
  updateBookAvailability,
  getSingleBook,
} from "./book.controller";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getSingleBook);
router.post("/", createBook);
router.put("/:id/availability", updateBookAvailability);

export default router;

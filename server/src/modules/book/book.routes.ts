// src/routes/bookRoutes.ts
import express from "express";
import {
  getBooks,
  createBook,
  updateBookAvailability,
} from "./book.controller";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id/availability", updateBookAvailability);

export default router;

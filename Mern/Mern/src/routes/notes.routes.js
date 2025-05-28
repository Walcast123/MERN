import { Router } from "express";
const router = Router();

import {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controller.js";

// Elimina el prefijo "/notes", ya que ya está incluido en app.js
router.get("/", getNotes);
router.post("/", createNote);
router.get("/:id", getNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;

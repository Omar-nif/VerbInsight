import express from "express";
import { getVerbInfo } from "../controllers/verbController.js";

const router = express.Router();

// Ruta: GET /api/verbs/:verb
router.get("/:verb",getVerbInfo);

export default router;
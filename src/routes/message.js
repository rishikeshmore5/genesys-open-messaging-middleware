import { Router } from "express";
import { postMessage } from "../controllers/messageController.js";

const router = Router();

router.post("/", postMessage);

export default router;
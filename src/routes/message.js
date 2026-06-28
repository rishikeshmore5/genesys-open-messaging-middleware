import { Router } from "express";
import { postMessage, getNewMessages } from "../controllers/messageController.js";

const router = Router();

router.post("/", postMessage);

// NEW: Endpoint for UI checking: GET /message/customer-001
router.get("/:customerId", getNewMessages);

export default router;
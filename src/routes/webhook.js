import { Router } from "express";
import { handleWebhook } from "../controllers/webhookController.js";

const router = Router();

// Genesys sends outbound notifications via POST
router.post("/", handleWebhook);

export default router;
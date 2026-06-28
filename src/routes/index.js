import { Router } from "express";
import { getAccessToken } from "../services/oauthService.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        application: "Genesys Open Messaging Middleware",
        version: "1.0.0",
        status: "Running"
    });
});

router.get("/health", (req, res) => {
    res.json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});

router.get("/oauth", async (req, res) => {
    try {
        await getAccessToken();

        res.json({
            success: true,
            message: "OAuth authentication successful."
        });

    } catch (err) {

        console.error(err.response?.data || err.message);

        res.status(500).json({
            success: false,
            error: err.response?.data || err.message
        });

    }
});

export default router;
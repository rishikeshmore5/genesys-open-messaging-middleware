import crypto from "crypto";
import env from "../config/env.js";

export function verifyGenesysSignature(req, res, next) {
    const signature = req.headers["x-hub-signature-256"];
    
    if (!signature) {
        return res.status(401).json({ error: "Missing signature header." });
    }

    // Genesys computes the HMAC SHA256 signature using your Webhook Secret
    const hmac = crypto.createHmac("sha256", env.WEBHOOK_SECRET);
    
    // Crucial: req.body must be the raw body string or properly parsed to calculate correctly
    const calculatedSignature = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(calculatedSignature))) {
        return next();
    }

    return res.status(403).json({ error: "Invalid signature. Request untrusted." });
}
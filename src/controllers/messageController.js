import { sendMessage } from "../services/messageService.js";
import { messageStore } from "./webhookController.js";

export async function postMessage(req, res) {

    try {

        const message = {
    customerId: req.body.customerId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    text: req.body.text
};
        const response = await sendMessage(message);

        res.json({
            success: true,
            data: response
        });

    } catch (err) {

        console.error(err.response?.data || err.message);

        res.status(500).json({

            success: false,

            error: err.response?.data || err.message

        });

    }

}

// NEW: Add the retrieval handler for your HTML interface polling
export async function getNewMessages(req, res) {
    try {
        const { customerId } = req.params;

        if (messageStore.has(customerId)) {
            const messages = messageStore.get(customerId);
            
            // Clear out delivery buffer array so messages aren't re-fetched
            messageStore.set(customerId, []);

            return res.json({
                success: true,
                messages: messages
            });
        }

        res.json({
            success: true,
            messages: []
        });

    } catch (err) {
        console.error("Error retrieving messages:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
}
// A simple in-memory map for testing: customerId -> conversationId
export const activeConversations = new Map();

export async function handleWebhook(req, res) {
    try {
        const event = req.body;
        
        // Always respond 200 OK immediately
        res.sendStatus(200);

        // 1. Handle Delivery Receipts (Ignore or log for now)
        if (event.type === "Receipt") {
            console.log(`[Receipt] Message ${event.channel.messageId} status: ${event.status}`);
            return;
        }

        // 2. Handle actual text replies (from Bot or Agent)
        if (event.type === "Text" && event.direction === "Outbound") {
            const customerId = event.channel.to.id; // Target recipient
            const conversationId = event.conversationId;
            const messageText = event.text;
            const senderType = event.originatingEntity; // 'Bot' or 'User'

            console.log(`\n📬 Reply from ${senderType}: "${messageText}" -> Forwarding to customer: ${customerId}`);

            // Store the conversation mapping so we know this customer is in an active session
            if (!activeConversations.has(customerId)) {
                activeConversations.set(customerId, conversationId);
                console.log(`[Session Created] Linked customer ${customerId} to conversation ${conversationId}`);
            }
            
            // TODO: Here you would push this message to your user interface (via WebSockets or long polling)
        }

    } catch (err) {
        console.error("Error processing webhook data:", err.message);
    }
}
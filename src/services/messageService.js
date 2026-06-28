import axios from "axios";
import { v4 as uuid } from "uuid";

import env from "../config/env.js";
import { getAccessToken } from "./oauthService.js";

export async function sendMessage(message) {

    const token = await getAccessToken();

    const payload = {
        channel: {
            from: {
                id: message.customerId,
                idType: "Opaque",
                firstName: message.firstName,
                lastName: message.lastName
            },
            time: new Date().toISOString(),
            messageId: uuid()
        },

        text: message.text
    };

    const response = await axios.post(

        `${env.API_URL}/api/v2/conversations/messages/${env.INTEGRATION_ID}/inbound/open/message`,

        payload,

        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

    );

    return response.data;
}
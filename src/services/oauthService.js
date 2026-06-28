import axios from "axios";
import env from "../config/env.js";
import { getToken, saveToken } from "../utils/tokenStore.js";

export async function getAccessToken() {

    const cachedToken = getToken();

    if (cachedToken) {
        console.log("Using cached OAuth token");
        return cachedToken;
    }

    console.log("Requesting new OAuth token...");

    const credentials = Buffer
        .from(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`)
        .toString("base64");

    const response = await axios.post(

        `https://login.${env.GENESYS_REGION}.pure.cloud/oauth/token`,

        "grant_type=client_credentials",

        {
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

    );

    saveToken(
        response.data.access_token,
        response.data.expires_in
    );

    return response.data.access_token;
}
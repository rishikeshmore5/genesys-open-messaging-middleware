import dotenv from "dotenv";

dotenv.config();

export default {

    PORT: process.env.PORT || 3000,

    GENESYS_REGION: process.env.GENESYS_REGION,

    LOGIN_URL: `https://login.${process.env.GENESYS_REGION}.pure.cloud`,

    API_URL: `https://api.${process.env.GENESYS_REGION}.pure.cloud`,

    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,

    INTEGRATION_ID: process.env.INTEGRATION_ID,

    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET

};
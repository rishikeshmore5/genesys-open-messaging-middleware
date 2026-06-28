import app from "./app.js";
import env from "./config/env.js";

app.listen(env.PORT, () => {
    console.log("==================================");
    console.log("Genesys Open Messaging Middleware");
    console.log(`Server running on port ${env.PORT}`);
    console.log("==================================");
});
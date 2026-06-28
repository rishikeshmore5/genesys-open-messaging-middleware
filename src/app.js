import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import messageRoutes from "./routes/message.js";
import webhookRoutes from "./routes/webhook.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", routes);
app.use("/message", messageRoutes);
// Mount webhook endpoint
app.use("/webhook", webhookRoutes);

export default app;
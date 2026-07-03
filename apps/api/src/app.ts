import cors from "cors";
import express from "express";
import { attachAuth } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { clientsRouter } from "./routes/clients.js";
import { healthRouter } from "./routes/health.js";
import { organizationsRouter } from "./routes/organizations.js";
import { projectsRouter } from "./routes/projects.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(healthRouter);
app.use(attachAuth);
app.use(organizationsRouter);
app.use(clientsRouter);
app.use(projectsRouter);
app.use(errorHandler);

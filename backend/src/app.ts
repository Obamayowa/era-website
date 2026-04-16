import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  // CORS
  app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }));

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve uploaded files
  const uploadsPath = path.resolve(process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads"));
  app.use("/uploads", express.static(uploadsPath));

  // API routes
  app.use("/api", apiRoutes);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}

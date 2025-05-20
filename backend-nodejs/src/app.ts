import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./configs/cors.configs";
import bodyParser from "body-parser";
import statusMonitor from "express-status-monitor";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

// Create Express app
const app: Application = express();
const API_START = "/api/v1";

// Rate Limiter (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(statusMonitor({ path: API_START + "/status" }));

// Routes
import demoRouter from "./routes/demo.routes";

// APIs
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the API World!" });
});

app.use(API_START + "/demo", demoRouter);

export default app;

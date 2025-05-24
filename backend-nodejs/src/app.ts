import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import statusMonitor from "express-status-monitor";
import helmet from "helmet";
import corsOptions from "./middlewares/cors.middleware";
import { rateLimiter } from "./middlewares/ratelimiter.middleware";
import { requestLogger } from "./middlewares/userlogs.middleware";
import demoRouter from "./routes/demo.routes";

dotenv.config();

// Create Express app
const app: Application = express();
const API_START = "/api/v1";

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: [
        "'self'",
        "https://cdnjs.cloudflare.com",
        "'sha256-smeKlzoBksVYJbpIwiP/yNzhQLzmXzVRkIh1Wvvydz4='",
      ],
      // Include other directives as needed (e.g., styleSrc, imgSrc)
    },
  })
);
app.use(rateLimiter);
app.use(requestLogger);
app.use(statusMonitor({ path: API_START + "/status" }));

// APIs
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the API World!" });
});

app.use(API_START + "/demo", demoRouter);

export default app;

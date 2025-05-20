import { CorsOptions } from "cors";

// Define the allowed origins for CORS
// This can be set in the environment variables for flexibility
const allowedOrigins = process.env.APP_CORS_ALLOWED_URLS?.split(",").map(
  (url) => url.trim()
) || ["*"];

// Define the CORS options
// This configuration allows requests from the specified origins
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // Allow non-browser requests like curl or Postman
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS request from ${origin} rejected`); // Log rejected requests
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Authorization"],
  optionsSuccessStatus: 200, // for legacy browsers
  preflightContinue: false,
};

export default corsOptions;

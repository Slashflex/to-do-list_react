const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 1337;
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const routes = require("./routes/api");
const cors = require('cors');
const globalErrorHandler = require('./utils/errorController');

dotenv.config({ path: "./config.env" });

// Database connexion
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

app.enable("trust proxy");

// Implement Cors 
app.use(cors());
app.options("*", cors());

// Serves static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Route
app.use("/api", routes);

// Sends data to front end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Global error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

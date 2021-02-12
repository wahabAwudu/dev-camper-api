const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/error");

dotenv.config({ path: "./.env" });

// connect to database
connectDb();

// get middlewares
// const loggerMiddleWare = require("./middlewares/logger");
// get routes
const bootcampRoutes = require("./routes/bootcamps");
const authRoutes = require("./routes/auth");

const app = express();

// register middlewares
// morgan prints out request meta data to console.
if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// in built middleware to parse request body to json.
app.use(express.json());

// register routes
app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/auth", authRoutes);

// use controller error handler middleware.
// should come after routes in order to work.
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`)
);

// handle unhandled promise rejections.
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // close server & exit process.
  server.close(() => process.exit(1));
});

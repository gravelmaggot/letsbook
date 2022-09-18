import AppError from "./appError.js";
import { isCelebrateError } from "celebrate";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data: ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  // Trusted error, send to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Unknown error, cannot leak to client
  else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export default function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (isCelebrateError(err)) {
    let errorMessage = null;
    const bodyError = err.details.get("body");
    const paramError = err.details.get("params");

    if (bodyError) {
      errorMessage = bodyError.details.map((error) => error.message);
    } else {
      errorMessage = paramError.details.map((error) => error.message);
    }

    return res.status(400).json({
      status: "error",
      message: errorMessage,
    });
  }

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "test"
  ) {
    if (err.name === "CastError") {
      err = handleCastErrorDB(err);
    }

    if (err.code === 11000) {
      err = handleDuplicateFieldsDB(err);
    }

    if (err.name === "ValidationError") {
      err = handleValidationErrorDB(err);
    }

    sendProdError(err, res);
  }
}

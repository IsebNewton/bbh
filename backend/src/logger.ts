import * as express from "express";

const logger: express.Handler = (req, _, next) => {
  const timestamp = Math.floor(Date.now() / 1000);
  console.info(`${timestamp}: ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;

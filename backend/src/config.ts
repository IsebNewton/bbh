import * as path from "path";

const config = {
  appSecret: process.env["APP_SECRET"] || "dark guardian angle bartholomeus",
  dataDir: path.join(__dirname, "..", "data"),
  port: process.env["PORT"] || 8080,
  sessionTimeout: 30 * 60,
  sessionsDir: path.join(__dirname, "..", "data", "sessions"),
  webDir: path.join(__dirname, "..", "frontend"),
  webEntry: path.join(__dirname, "..", "frontend", "index.html"),
};

export type Config = typeof config;
export default config;

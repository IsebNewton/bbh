import * as path from "path";

const config = {
  appSecret: process.env["APP_SECRET"] || "dark guardian angle bartholomeus",
  dataDir: process.env["DATA_DIR"] || path.join(__dirname, "..", "data"),
  port: process.env["PORT"] || 8080,
  sessionTimeout: process.env["SESSION_TIMEOUT"] || 30 * 60,
  sessionsDir:
    process.env["SESSIONS_DIR"] ||
    path.join(__dirname, "..", "data", "sessions"),
  webDir: process.env["WEB_DIR"] || path.join(__dirname, "..", "frontend"),
  webEntry:
    process.env["WEB_ENTRY"] ||
    path.join(__dirname, "..", "frontend", "index.html"),
};

export type Config = typeof config;
export default config;

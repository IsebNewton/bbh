import * as path from "path";

const config = {
  dataDir: path.join(__dirname, "..", "data"),
  port: 8080,
  webDir: path.join(__dirname, "..", "frontend"),
  webEntry: path.join(__dirname, "..", "frontend", "index.html"),
};

export type Config = typeof config;
export default config;

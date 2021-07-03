import app from "./app";
import config from "./config";

process.on("SIGINT", () => {
  console.info("Interrupted");
  process.exit(0);
});

app(config);

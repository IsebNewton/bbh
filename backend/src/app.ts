import * as cors from "cors";
import * as express from "express";
import * as os from "os";
import api from "./api";
import { Config } from "./config";
import logger from "./logger";

export default async function (config: Config) {
  try {
    const app = express();

    app.use(cors());
    app.use(logger);

    app.use("/api", await api(config));

    app.get("/", (_, res) => res.sendFile(config.webEntry));

    app.use(express.static(config.webDir));

    app.use((_, res) => res.sendStatus(404));

    app.listen(config.port, () => {
      const msg = `Server listening on: http://${os.hostname()}:${config.port}`;
      console.log(msg);
    });
  } catch (err) {
    console.error("Failed to start server!");
    console.error(err);
  }
}

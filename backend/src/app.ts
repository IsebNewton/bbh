import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import * as os from "os";
import * as sessionStore from "session-file-store";
import api from "./api";
import { Config } from "./config";
import logger from "./logger";

export default async function (config: Config) {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json({ strict: false }));
    app.use(logger);
    app.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: config.appSecret,
        store: new (sessionStore(session))({
          path: config.sessionsDir,
        }),
      })
    );

    app.use("/api", await api(config));
    app.use("/api", (_, res) => res.sendStatus(405));

    app.get("/", (_, res) => res.sendFile(config.webEntry));

    app.use(express.static(config.webDir));

    app.use((_, res) => res.sendStatus(404));
    app.use((err, req, res, next) => {
      if (err instanceof SyntaxError) {
        res.status(400).send(err.message);
        return;
      }

      console.error(err);
      res.sendStatus(500);
    });

    app.listen(config.port, () => {
      const msg = `Server listening on: http://${os.hostname()}:${config.port}`;
      console.log(msg);
    });
  } catch (err) {
    console.error("Failed to start server!");
    console.error(err);
  }
}

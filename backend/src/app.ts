import * as express from "express";
import * as path from "path";

// -----------------------------------------------------------------------------

const frontendDir = path.join(__dirname, "..", "frontend");

// -----------------------------------------------------------------------------

const app = express();

app.get("/", (_, res) => res.sendFile(path.join(frontendDir, "index.html")));
app.use(express.static(frontendDir, { fallthrough: false }));

export default app;

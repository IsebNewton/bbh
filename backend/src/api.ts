import * as fs from "fs/promises";
import * as path from "path";
import * as express from "express";
import { Config } from "./config";
import * as csv from "./csv";

export default async function (config: Config): Promise<express.Router> {
  let { colors, parameters, products, users } = await loadData(config);
  const refProduct = { ...Object.values(products)[0] };
  delete refProduct["id"];

  const router = express.Router();

  router.get("/colors", (_, res) => res.json(colors));
  router.get("/parameters", (_, res) => res.json(Object.values(parameters)));
  router.get("/products", (_, res) => res.json(Object.values(products)));

  router.get("/brands", (_, res) => {
    const brands = {};
    for (const key in products) {
      if (Object.prototype.hasOwnProperty.call(products, key)) {
        const brand = products[key]["brand"];
        if (!brands[brand]) {
          brands[brand] = true;
        }
      }
    }
    res.json(Object.keys(brands));
  });

  // login
  router.post("/auth", (req, res) => {
    const { name, password } = req.body;
    if (!users[name] || users[name] !== password) {
      req.session[authKey] = 0;
      res.sendStatus(400);
      return;
    }

    req.session[authKey] = unixtime();
    res.sendStatus(200);
  });

  // auth required from here ---------------------------------------------------
  router.use(auth(config));
  router.get("/auth", (_, res) => res.sendStatus(200));
  router.delete("/auth", (req, res) => {
    req.session[authKey] = 0;
    res.sendStatus(200);
  });

  router.put("/parameters", async (req, res) => {
    const body = req.body;
    const newParams = toMap(req.body, "id");
    if (!isSimilar(parameters, newParams)) {
      res.sendStatus(400);
      return;
    }

    parameters = newParams;

    const csvData = csv.serialize(body);
    await fs.writeFile(path.join(config.dataDir, "parameters.csv"), csvData);

    res.json(body);
  });

  router.post("/products", async (req, res) => {
    if (!isSimilar(refProduct, req.body)) {
      res.sendStatus(400);
      return;
    }

    let id = Object.values(products).length;
    while (products[id]) ++id;

    const product = { ...req.body, id };
    products[id] = product;
    const productsArr = Object.values(products);

    const csvData = csv.serialize(productsArr);
    await fs.writeFile(path.join(config.dataDir, "products.csv"), csvData);

    res.json(productsArr);
  });

  router.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    if (!products[id]) {
      res.sendStatus(404);
      return;
    }

    if (!isSimilar(refProduct, req.body)) {
      res.sendStatus(400);
      return;
    }

    const product = { ...req.body, id };
    products[id] = product;
    const productsArr = Object.values(products);

    const csvData = csv.serialize(productsArr);
    await fs.writeFile(path.join(config.dataDir, "products.csv"), csvData);

    res.json(product);
  });

  router.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    if (!products[id]) {
      res.sendStatus(404);
      return;
    }

    if (Object.values(products).length === 1) {
      res.send(400).send("There always has to be one product in the database");
      return;
    }

    delete products[id];
    const productsArr = Object.values(products);

    const csvData = csv.serialize(productsArr);
    await fs.writeFile(path.join(config.dataDir, "products.csv"), csvData);

    res.sendStatus(200);
  });

  return router;
}

const authKey = "loggedIn";

function auth(config: Config): express.Handler {
  return (req, res, next) => {
    const authTime = req.session[authKey];
    if (!authTime || unixtime() - authTime > config.sessionTimeout) {
      res.sendStatus(401);
      return;
    }

    req.session[authKey] = unixtime();
    next();
  };
}

function isSimilar<T>(reference: T, subject: any): subject is T {
  const refType = typeof reference;
  switch (refType) {
    case "object":
      if (reference instanceof Array) {
        if (!(subject instanceof Array)) {
          return false;
        }
        if (reference.length > 0 && subject.length > 0) {
          return isSimilar(reference[0], subject[0]);
        }
        return true;
      }

      for (const key in reference) {
        if (Object.prototype.hasOwnProperty.call(reference, key)) {
          if (!Object.prototype.hasOwnProperty.call(subject, key)) {
            return false;
          }

          if (!isSimilar(reference[key], subject[key])) {
            return false;
          }
        }
      }

      return true;

    default:
      return refType === typeof subject;
  }
}

async function loadData(config: Config) {
  const colors = csv.parse(await loadFile(config, "colors.csv"));

  const parameters = toMap<any>(
    csv.parse(await loadFile(config, "parameters.csv")),
    "id"
  );

  const products = toMap<any>(
    csv.parse(await loadFile(config, "products.csv")).map((product: any) => ({
      ...product,
      sizeVariants: eval(product["sizeVariants"]),
      color: eval(product["color"]),
      images: eval(product["images"]),
    })),
    "id"
  );

  const users = csv
    .parse(await loadFile(config, "users.csv"))
    .reduce<{ [key: string]: string }>(
      (result, user) => ({ ...result, [user["name"]]: user["password"] }),
      {}
    );

  return { colors, parameters, products, users };
}

async function loadFile(config: Config, filename: string): Promise<string> {
  const filepath = path.join(config.dataDir, filename);
  const buffer = await fs.readFile(filepath);
  return buffer.toString();
}

function toMap<T>(array: T[], key: keyof T): { [key: string]: T } {
  return array.reduce(
    (result, entry) => ({ ...result, [`${entry[key]}`]: entry }),
    {}
  );
}

function unixtime(): number {
  return Math.floor(Date.now() / 1000);
}

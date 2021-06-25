import * as fs from "fs/promises";
import * as path from "path";
import * as express from "express";
import { Config } from "./config";
import * as csv from "./csv";

export default async function (config: Config): Promise<express.Router> {
  const colors = csv.parse(await loadFile(config, "colors.csv"));
  const parameters = csv.parse(await loadFile(config, "parameters.csv"));
  const products = csv
    .parse(await loadFile(config, "products.csv"))
    .map((product: any) => ({
      ...product,
      sizeVariants: eval(product["sizeVariants"]),
      color: eval(product["color"]),
      images: eval(product["images"]),
      recommended: eval(product["recommended"]),
    }));
  const brands: string[] = removeDuplicates(products.map((p) => p["brand"]));

  const router = express.Router();

  router.get("/brands", (_, res) => res.json(brands));
  router.get("/colors", (_, res) => res.json(colors));
  router.get("/parameters", (_, res) => res.json(parameters));
  router.get("/products", (_, res) => res.json(products));

  return router;
}

async function loadFile(config: Config, filename: string): Promise<string> {
  const filepath = path.join(config.dataDir, filename);
  const buffer = await fs.readFile(filepath);
  return buffer.toString();
}

function removeDuplicates(strings: string[]): string[] {
  const stringMap = {};
  strings.forEach((string) => {
    if (!stringMap[string]) {
      stringMap[string] = true;
    }
  });
  return Object.keys(stringMap);
}

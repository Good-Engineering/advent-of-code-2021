import * as path from "path";
import * as fs from "fs";

export function readFile(filename: string) {
  const filepath = path.join(__dirname, filename);
  return fs.readFileSync(filepath, { encoding: "utf8" });
}

export function* range(end) {
  for (let i = 1; i <= end; i++) {
    yield i;
  }
}

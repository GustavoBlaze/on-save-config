import assert from "node:assert";
import { readdir } from "node:fs/promises";

interface IGetFilesOnDirectory {
  directory: string;
  extension?: string | string[];
}

export default async function getFilesOnDirectory({
  directory,
  extension,
}: IGetFilesOnDirectory) {
  assert(directory, "directory is required");

  const files = await readdir(directory);

  if (!extension) {
    return files;
  }

  const singleExtension = typeof extension === "string";
  const extensions = singleExtension ? [extension] : extension;
  const expression = new RegExp(`\\.${extensions.join("|")}$`);

  return files.filter(file => expression.test(file));
}

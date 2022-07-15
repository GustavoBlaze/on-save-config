import { open } from "node:fs/promises";

const FILE_HEADER = `
/**
 * This file is generated automatically, please do not edit it manually.
 * */
`.trim();

interface IPutTheContentDown {
  content: string;
  file: string;
}

export default async function putTheContentDown({
  content,
  file,
}: IPutTheContentDown) {
  const fileInstance = await open(file, "w");

  fileInstance.write(`${FILE_HEADER}\n\n${content}`);

  fileInstance.close();
}

import getFilesOnDirectory from "../utils/get-files-on-directory";
import putTheContentDown from "../utils/put-the-content-down";

interface IExportConsolidation {
  directory: string;
  output: string;
  removeFileExtension?: boolean;
}

export default async function JSExportConsolidation({
  directory,
  output,
  removeFileExtension = true,
}: // consolidationFile,
IExportConsolidation) {
  if (!directory)
    throw new Error("[JSExportConsolidation] directory is required");
  const extension = ["js", "jsx", "tsx", "ts"];

  const files = await getFilesOnDirectory({ directory, extension });
  const imports = [];

  for (const file of files) {
    const mod = require(`${directory}/${file}`);
    const filename = removeFileExtension ? file.replace(/\.[^/.]+$/, "") : file;

    if (mod?.default?.name) {
      imports.push(
        `export { default as ${mod.default.name} } from "./${filename}"`
      );
    }
  }

  const content = imports.join("\n");

  await putTheContentDown({
    content,
    file: output,
  });
}

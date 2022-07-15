import path from "node:path";
import JSExportConsolidation from "./actions/js-export-consolidation";

const dir = path.join(__dirname, "..", "test");
const output = path.join(__dirname, "..", "test", "index.js");

JSExportConsolidation({
  directory: dir,
  output,
  removeFileExtension: true,
});

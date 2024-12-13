import fs from "fs";

export const loadData = (fileName) => {
  if (!fs.existsSync(fileName)) return [];
  return JSON.parse(fs.readFileSync(fileName));
};

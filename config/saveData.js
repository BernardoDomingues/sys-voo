import fs from "fs";

export const saveData = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
};
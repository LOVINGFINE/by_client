/* eslint-disable @typescript-eslint/no-var-requires */
const babel = require("@babel/core");
const fs = require("fs");
const { resolve, join } = require("path");

const list = [];
function readDir(path) {
  const dirs = fs.readdirSync(path);
  dirs.forEach((ele) => {
    const url = join(path, `${ele}`);
    const stat = fs.statSync(url);
    const isFile = stat.isFile();
    if (isFile && ele.indexOf(".json") === -1 && ele.indexOf(".js") > -1) {
      const a = babel.transformFileSync(url);
      fs.writeFileSync(join(path, `code.${ele}`), a.code);
    }
    list.push({
      isFile,
      name: ele,
      url,
    });
  });
}

readDir(resolve(__dirname, "./"));


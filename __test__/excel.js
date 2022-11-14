/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const { resolve } = require("path");

function getDataSource(c = 20, r = 50) {
  const list = [];
  for (let i = 0; i < r; i++) {
    const temp = [];
    temp;
    for (let j = 0; j < c; j++) {
      temp.push(`第${j + 1}列 第${i + 1}行 `);
    }
    list.push(temp);
  }
  return list;
}

const dataSource = getDataSource(10, 50);

fs.writeFileSync(
  resolve(__dirname, "./excel.json"),
  JSON.stringify(
    {
      dataSource,
    },
    null,
    2
  )
);

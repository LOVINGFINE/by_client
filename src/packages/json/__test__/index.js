/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const { resolve } = require("path");

function getRecords(num = 5) {
  const list = [];
  for (let i = 0; i < num; i++) {
    list.push({
      name: "连接-" + i,
      createdTime: new Date().toString(),
      updatedTime: new Date().toString(),
      status: i % 2 === 0,
      count: (i + 1) * 20,
    });
  }
  return list;
}

const dataSource = {
  ["名称"]: "zhangkong365",
  ["连接数量"]: 3000,
  ["是否在线"]: true,
  ["连接统计"]: getRecords(),
};

fs.writeFileSync(
  resolve(__dirname, "./dataSource.json"),
  JSON.stringify(
    {
      aaa: dataSource,
      ccc: dataSource,
      arr: [dataSource, dataSource, dataSource],
    },
    null,
    2
  )
);

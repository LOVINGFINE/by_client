/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const { resolve } = require("path");

function getX() {
  const list = [];
  for (let i = 0; i < 20; i++) {
    list.push({
      id: `header${i}`,
      label: `列${i}`,
    });
  }
  return list;
}

function getDataSource() {
  const headers = getX();
  const list = [];
  for (let i = 0; i < 5; i++) {
    const temp = {
      label: `求和项:${i}`,
      id: `row-${i}`,
      records: {},
    };
    headers.forEach((ele) => {
      temp.records[ele.id] = parseInt(Math.random() * 100);
    });
    list.push(temp);
  }
  return {
    columns: headers,
    rows: list,
  };
}

const dataSource = getDataSource();

fs.writeFileSync(
  resolve(__dirname, "./line.json"),
  JSON.stringify(dataSource, null, 2)
);

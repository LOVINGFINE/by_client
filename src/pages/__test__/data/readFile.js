/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const XLSX = require("xlsx");
const { resolve, join } = require("path");
const dayjs = require("dayjs");
function readBase() {
  const data = fs.readFileSync(resolve(__dirname, "./12月工资统计表.xlsx"));
  let workBook = XLSX.read(data, {
    raw: true,
  });
  workBook.SheetNames.forEach((name, i) => {
    if (i === 0) {
      let sheet = workBook.Sheets[name];
      let json = XLSX.utils.sheet_to_json(sheet, {
        raw: true,
      });
      const list = json
        .map((ele, i) => {
          if (ele["入职时间"]) {
            const into_time = dayjs("1900-01-01")
              .add(parseInt(ele["入职时间"]) - 2, "day")
              .toString();
            return {
              id: ele["身份证"],
              name: ele["姓名"],
              into_time: into_time,
              phone: ele["手机号"],
              email: ele["邮箱"],
              department: ele["部门"],
              basic_wage: ele[" 工资基数 "],
              performance_pay: ele["__EMPTY"],
              housing_allowance: ele[" 房租补贴 "] || 0,
              remaining_hj: 0,
              remaining_cy: 0,
            };
          }
          return {};
        })
        .filter((ele) => ele.id);
      fs.writeFileSync(
        resolve(__dirname, "./excel.json"),
        JSON.stringify(
          {
            dataSource: list,
          },
          null,
          2
        )
      );
    }
  });
}

readBase();

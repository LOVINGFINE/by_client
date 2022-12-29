import { readFileBinaryProgress } from "@/tools/file";
import dayjs from "dayjs";
import { read, writeFileXLSX, utils } from "xlsx";

export function getYearMonths(year: number) {
  const list: {
    year: number;
    value: number;
    label: string;
  }[] = [];
  for (let m = 0; m < 12; m++) {
    list.push({
      value: m,
      label: `${m + 1}月`,
      year,
    });
  }
  return list;
}

// 当月工作日天数 16号 到 下个月 15号
export function getMonthAttendanceDays(y?: number, m?: number) {
  const current = new Date();
  const year = y || current.getFullYear();
  const month = m || current.getMonth();
  const currentLastDay = new Date(year, month + 1, 0).getDate() - 15;
  const nextLastDay = new Date(year, month + 1, 14).getDate() + 1;
  const total = currentLastDay + nextLastDay;
  let days = 0;
  const final = ["日", "一", "二", "三", "四", "五", "六"];
  const month_range = [];
  for (let i = 1; i <= total; i++) {
    const date =
      i + 15 > total
        ? new Date(year, month + 1, i - 15)
        : new Date(year, month, i + 15);
    const weekDay = date.getDay();

    if (weekDay > 0 && weekDay < 6) {
      days += 1;
    }
    const date_string = `${dayjs(date).format("YYYY-MM-DD")} 星期${
      final[weekDay]
    }`;
    month_range.push(date_string);
  }
  return {
    total,
    days,
    month_range,
  };
}

export async function readMonthData(file: File, month_range: string[]) {
  const res = await readFileBinaryProgress(file, { type: "arrayBuffer" });

  const workBook = read(res, {
    raw: true,
  });
  const { Sheets, SheetNames } = workBook;
  const monthBook = Sheets[SheetNames[0]];
  const monthBookJson = utils.sheet_to_json(monthBook, {
    raw: true,
  });
  const first_row = monthBookJson[0] as {
    [k: string]: string;
  };
  const month_range_keys = [];
  for (const key in first_row) {
    console.log(first_row[key]);
    if (month_range.includes(first_row[key])) {
      month_range_keys.push({
        key,
        date: first_row[key],
      });
    }
  }
  const dateSource = [];
  for (let i = 1; i < monthBookJson.length; i++) {
    const item = monthBookJson[i] as {
      [k: string]: string;
    };
    const range: { date: string; value: string }[] = [];
    month_range_keys.forEach((ele) => {
      range.push({
        date: ele.date,
        value: item[ele.key],
      });
    });
    dateSource.push({
      name: item["姓名"],
      range,
      analyze: analyzePersonMonth(range),
    });
  }
  return dateSource;
}

export function analyzePersonMonth(range: { date: string; value: string }[]) {
  const analyze = {
    days: 0,
    overtime: 0,
    personalLeave: 0,
    annualLeave: 0,
    sickLeave: 0,
    unusual: [],
  };
  range.forEach((ele) => {
    const value = ele.value;
    if (ele.date.indexOf("星期六") > -1 || ele.date.indexOf("星期日") > -1) {
      analyze.overtime += getValueDay(ele.value);
    } else {
      analyze.days += getValueDay(ele.value);
    }
  });
  const getValueDay = (value: string): number => {
    if (value === "-") {
      return 0;
    }
    const str = value.split(";")[0];
    return (
      str.split(",").filter((ele) => {
        return ele.indexOf("正常") > -1;
      }).length * 0.5
    );
  };
 
  return analyze;
}

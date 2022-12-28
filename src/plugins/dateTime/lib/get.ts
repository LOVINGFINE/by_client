import { week_day_values } from "./final";
import { MonthWeek, MonthWeekDay, YearMonth } from "./type";

// 当月天数
export function getMonthDays(y?: number, m?: number) {
  const current = new Date();
  const year = y || current.getFullYear();
  const month = m || current.getMonth();
  return new Date(year, month + 1, 0).getDate();
}

// 当月工作日天数
export function getMonthAttendanceDays(y?: number, m?: number) {
  const current = new Date();
  const year = y || current.getFullYear();
  const month = m || current.getMonth();
  const lastDay = getMonthDays(year, month);
  let days = 0;
  for (let i = 1; i <= lastDay; i++) {
    const weekDay = new Date(year, month, i).getDay();
    if (weekDay > 0 && weekDay < 6) {
      days += 1;
    }
  }
  return days;
}

// 获取某一年 月份数据
export function getYearMonths(y?: number) {
  const current = new Date();
  const year = y || current.getFullYear();
  const months: YearMonth[] = [];
  for (let m = 0; m < 12; m++) {
    months.push({
      value: m,
      label: `${m + 1}月`,
      year,
    });
  }
  return months;
}

// 获取某年某月 按周分组
export function getMonthWeeks(y?: number, m?: number) {
  const current = new Date();
  const year = y || current.getFullYear();
  const month = m || current.getMonth();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month, 2);
  const firstWeekDay = firstDay.getDay();
  const lastDay = new Date(year, month + 1, 0);
  const weeks: MonthWeek[] = [];
  let c = 1;
  let ls = 1;
  for (let m = 0; m < 6; m++) {
    const week: MonthWeek = [];
    let b = false;
    week_day_values.forEach((item, w) => {
      const inMonth = (w < firstWeekDay && m === 0) || c > lastDay.getDate();
      const day: MonthWeekDay = {
        year,
        month: month + 1,
        value: c,
        weekDay: item.value,
        inMonth,
      };
      if (w < firstWeekDay && m === 0) {
        // 上个月
        day["month"] = month;
        day["value"] = prevMonthLastDay - (firstWeekDay - w - 1);
      } else if (c > lastDay.getDate()) {
        // 下个月
        b = true;
        day["month"] = month + 2 > 12 ? month + 2 - 12 : month + 2;
        day["value"] = ls;
        ls += 1;
      } else {
        c += 1;
      }
      week.push(day);
    });
    weeks.push(week);
    if (b) {
      break;
    }
  }
  return weeks;
}

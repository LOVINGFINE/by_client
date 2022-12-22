import dayjs from "dayjs";
import { week_days } from "./final";
import { Week } from "./type";

export function getMonthWeeks(year: number, month: number) {
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month, 2);
  const firstWeekDay = firstDay.getDay();
  const lastDay = new Date(year, month + 1, 0);
  const weeks = [];
  let c = 1;
  let ls = 1;
  for (let m = 0; m < 6; m++) {
    const week: Week = [];
    let b = false;
    week_days.forEach((item, w) => {
      const day = {
        year,
        month: month + 1,
        value: c,
        weekDay: item.value,
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

export function getTimeDataSource(type: "h" | "m" | "s") {
  const dataSource: {
    value: number;
    label: string;
  }[] = [];
  if (type === "h") {
    for (let h = 0; h < 24; h++) {
      dataSource.push({
        value: h,
        label: `${h < 9 ? 0 : ""}${h}`,
      });
    }
  } else {
    for (let i = 0; i < 60; i++) {
      dataSource.push({
        value: i,
        label: `${i < 9 ? 0 : ""}${i}`,
      });
    }
  }
  return dataSource;
}

export function getDateFormat(date: Date, format: string) {
  return dayjs(date).format(format);
}

export function getStyles(childrenRef: HTMLElement | null, placement: string) {
  const getOffset = (current?: HTMLElement | null) => {
    if (current) {
      const { offsetHeight = 0, offsetWidth = 0 } = current;
      const offsetLeft = current.getBoundingClientRect().left;
      const offsetTop = current.getBoundingClientRect().top;
      return {
        offsetWidth,
        offsetHeight,
        offsetLeft,
        offsetTop,
      };
    }
    return {
      offsetWidth: 0,
      offsetHeight: 0,
      offsetLeft: 0,
      offsetTop: 0,
    };
  };
  const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
    getOffset(childrenRef);
  const centerH = offsetLeft + offsetWidth / 2;
  const extra = 6;
  switch (placement) {
    case "top":
      return {
        left: centerH,
        top: offsetTop - extra,
        transform: `translate(-50%,-100%)`,
        paddingBottom: extra,
      };
    default:
      return {
        // bottomx
        left: centerH,
        transform: `translateX(-50%)`,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
  }
}

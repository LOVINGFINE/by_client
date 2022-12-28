import { TimeItem, WeekDayValue } from "./type";
import { getTimeItems } from "./utils";

export const week_day_values: {
  value: WeekDayValue;
  label: string;
}[] = [
  {
    value: "sun",
    label: "日",
  },
  {
    value: "mon",
    label: "一",
  },
  {
    value: "tue",
    label: "二",
  },
  {
    value: "wed",
    label: "三",
  },
  {
    value: "thu",
    label: "四",
  },
  {
    value: "fri",
    label: "五",
  },
  {
    value: "sat",
    label: "六",
  },
];

export const time_hours = getTimeItems(24);

export const time_minutes = getTimeItems(60);

export const time_seconds = getTimeItems(60);

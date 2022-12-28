export interface YearMonth {
  year: number;
  value: number;
  label: string;
}

export interface Day {
  year: number;
  month: number;
  value: number;
  label?: number;
}

export interface MonthWeekDay extends Day {
  weekDay: WeekDayValue;
  inMonth: boolean;
}

export type WeekDayValue =
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat";

export type MonthWeek = MonthWeekDay[];

export interface TimeItem {
  value: number;
  label: string;
}

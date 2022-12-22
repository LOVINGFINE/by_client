export interface Day {
  year: number;
  month: number;
  value: number;
  weekDay: WeekDay;
}

export type WeekDay = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type Week = Day[];

export type PickerType = "day" | "month";

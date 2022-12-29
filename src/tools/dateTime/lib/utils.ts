import { TimeItem } from "./type";

export function getTimeItems(n: number) {
  const dataSource: TimeItem[] = [];
  for (let i = 0; i < n; i++) {
    dataSource.push({
      value: i,
      label: `${i < 9 ? 0 : ""}${i}`,
    });
  }
  return dataSource;
}

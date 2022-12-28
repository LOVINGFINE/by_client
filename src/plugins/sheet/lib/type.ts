export type SimpleValue = string | number | boolean;

export type DataSource = SimpleValue[][];

export interface Column {
  width: number;
}

export interface Row {
  height: number;
}
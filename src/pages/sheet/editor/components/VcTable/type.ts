export interface VcColumn {
  index: number;
  x: number;
  width: number;
}
export interface VcRow {
  index: number;
  y: number;
  height: number;
}

export type SimpleValue = string | number | boolean;

export interface SelectionItem {
  current: number;
  start: number;
  end: number;
}

export interface Selection {
  column: SelectionItem;
  row: SelectionItem;
}

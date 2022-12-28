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

export interface VcMergeOption {
  start: number;
  end: number;
}

export interface VcMerge {
  x: VcMergeOption;
  y: VcMergeOption;
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

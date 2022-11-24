import { CSSProperties, ReactElement } from "react";

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

export interface SelectionRef {
  scope: Selection;
  style: CSSProperties;
  render?: ReactElement | ReactElement[];
}
import { CSSProperties, ReactElement } from "react";

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
export type SimpleValue = string | number | boolean;

export type DataSource = SimpleValue[][];

export interface Cell {
  width: number;
  height: number;
  value: SimpleValue;
}

export interface VcCell extends Cell {
  x: number;
  y: number;
}

export interface Column {
  width: number;
  code?: string;
}

export interface VcColumn extends Column {
  width: number;
  x: number;
  code: string;
  index: number;
}

export interface Row {
  height: number;
}

export interface VcRow extends Row {
  y: number;
  index: number;
}

export interface VcTableCore {
  onSelection(e: Selection): void;
  deSelection(): void;
}

export enum DeviceOs {
  MacOS = "MacOS",
  Win = "Win",
}

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

export type SimpleData = string | number | boolean;

export type DataSource = SimpleData[][];

export interface VcColumn {
  width: number;
  x: number;
  index: number;
}

export interface VcRow {
  height: number;
  y: number;
  index: number;
}

export interface ColumnConfig {
  [k: string]: {
    width: number;
  };
}

export interface RowConfig {
  [k: string]: {
    height: number;
  };
}
export interface Config {
  columns: ColumnConfig;
  rows: RowConfig;
}

export interface VcTableCore {
  onSelection(e: Selection): void;
  deSelection(): void;
}

export enum Horizontal {
  center = "center",
  left = "left",
  right = "right",
}

export enum Vertical {
  top = "top",
  bottom = "bottom",
  middle = "middle",
}

export interface StyleOption {
  fontSize: number;
  lineHeight: number;
  background: string;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  vertical?: Vertical;
  horizontal?: Horizontal;
}

interface Comment {
  content: string;
}

export interface Cell {
  value: SimpleData;
  style: StyleOption;
  comments: Comment[];
}

export interface UpdateCell {
  x: number;
  y: number;
  value: SimpleData;
  style: Partial<StyleOption>;
  comments: Comment[];
}

export enum CellMenuKey {
  COPY = "COPY",
  PASTE = "PASTE",
  CLEAR = "CLEAR",
  INSERT_COLUMN = "INSERT_COLUMN",
  INSERT_ROW = "INSERT_ROW",
  REMOVE_COLUMN = "REMOVE_COLUMN",
  REMOVE_ROW = "REMOVE_ROW",
}

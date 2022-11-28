import { Selection, SimpleValue } from "@/pages/sheet/editor/type";
export interface WorkbookListItem {
  id: string;
  name: string;
}

export interface CommonWorkbook extends WorkbookListItem {
  data: WorkbookData;
  columns: ColumnConfig;
  rows: RowConfig;
  createdTime: string;
  updatedTime: string;
}

export interface WorkbookClipboard {
  selection: Selection;
  data: Cell[][];
}

export interface WorkbookData {
  [k: string]: Cell;
}

export interface DataPayload {
  [k: string]: Partial<Cell>;
}

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
  value: SimpleValue;
  style: StyleOption;
  comments: Comment[];
}

export interface UpdateCell {
  x: number;
  y: number;
  value: SimpleValue;
  style: Partial<StyleOption>;
  comments: Comment[];
}

export enum CellMenuKey {
  COPY = "COPY",
  PASTE = "PASTE",
  PASTE_CONTROL = "PASTE_CONTROL",
  PASTE_CUT = "PASTE_CUT",
  PASTE_CUT_CONTROL = "PASTE_CUT_CONTROL",
  CLEAR = "CLEAR",
  INSERT_COLUMN = "INSERT_COLUMN",
  INSERT_ROW = "INSERT_ROW",
  REMOVE_COLUMN = "REMOVE_COLUMN",
  REMOVE_ROW = "REMOVE_ROW",
}

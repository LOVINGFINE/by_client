import { Selection, SimpleValue } from "../components/VcTable";

export interface WorkbookCommonData {
  [k: string]: Cell;
}

export interface WorkbookHistory {
  current: number;
  items: {
    data: WorkbookCommonData;
  }[];
}

export interface WorkbookClipboard {
  selection: Selection;
  data: Cell[][];
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

export enum ContextMenuKey {
  COPY = "COPY",
  PASTE = "PASTE",
  CLEAR_ONLY = "CLEAR_ONLY",
  CLEAR_ALL = "CLEAR_ALL",
}

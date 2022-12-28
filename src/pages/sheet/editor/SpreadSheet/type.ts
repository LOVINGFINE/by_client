import { Selection, SimpleValue, VcMerge } from "../components/VcTable";

/** @cell */
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

export interface CellStyle {
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

export interface CommonCell {
  value: SimpleValue;
  style: CellStyle;
  comments: Comment[];
}

export interface CommonDataSource {
  [k: string]: CommonCell;
}

export interface CommonHistory {
  current: number;
  items: {
    data: CommonDataSource;
  }[];
}

export interface CommonClipboard {
  selection: Selection;
  data: CommonCell[][];
}

export interface CommonConfigure {
  column: ColumnSet;
  row: RowSet;
  merge: Merge[];
}

export interface ColumnSet {
  [k: string]: {
    width: number;
  };
}

export interface RowSet {
  [k: string]: {
    height: number;
  };
}

export interface Merge extends VcMerge {}

export enum ContextMenuKey {
  COPY = "COPY",
  PASTE = "PASTE",
  CLEAR_ONLY = "CLEAR_ONLY",
  CLEAR_ALL = "CLEAR_ALL",
}

export interface DataPayload {
  [k: string]: Partial<CommonCell>;
}

import { Selection, ColumnConfig, RowConfig } from "./Workbook/Table";
import { Cell } from "./Workbook/type";
export interface ExcelClipboard {
  selection: Selection;
  data: Cell[][];
}

export interface ExcelDataSource {
  [k: string]: Cell;
}

export interface DataSourcePayload {
  [k: string]: Partial<Cell>;
}

export interface Workbook {
  data: ExcelDataSource;
  name: string;
  id: string;
  columns: ColumnConfig;
  rows: RowConfig;
  createdTime: string;
  updatedTime: string;
}

/** @api */
export interface Sheet {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  owner: string;
  share: string[];
}
export interface WorkbookOption {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
}

export interface SheetListItem {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  lastOpenTime: string;
  owner: string;
  share: string[];
}

export type updateSizePayload =
  | {
      index: number;
      width: number;
    }
  | { index: number; height: number };

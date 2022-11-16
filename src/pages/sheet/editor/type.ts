import { Selection, ColumnConfig, RowConfig } from "./Workbook/Table";
import { Cell } from "./Workbook/type";

export interface Workbook {
  data: WorkbookData;
  name: string;
  id: string;
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

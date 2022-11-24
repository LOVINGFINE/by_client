import { SimpleValue, Selection } from "@/pages/sheet/editor/type";

export interface MetaWorkbook {
  code: string;
  columns: MetaColumn[];
  entries: WorkbookEntry[];
}

export interface MetaColumn {
  code: string;
  width: number;
  title: string;
}

export interface WorkbookEntry {
  id: string;
  values: {
    [k: string]: SimpleValue;
  };
}

export interface MetaClipboard {
  selection: Selection;
  data: SimpleValue[][];
}

export type DataSource = SimpleValue[][];

export interface VcColumn extends MetaColumn {
  x: number;
  index: number;
}

export interface VcEntry extends WorkbookEntry {
  height: number;
  y: number;
  index: number;
}

export interface VcTableCore {
  onSelection(e: Selection): void;
  deSelection(): void;
}

export enum CellMenuKey {
  COPY = "COPY",
  PASTE = "PASTE",
  CLEAR = "CLEAR",
  INSERT_COLUMN = "INSERT_COLUMN",
  INSERT_ENTRY = "INSERT_ENTRY",
  REMOVE_COLUMN = "REMOVE_COLUMN",
  REMOVE_ENTRY = "REMOVE_ENTRY",
}

export interface EntryQuery {
  page: number;
  pageSize: number;
  form: number;
  to: number;
}

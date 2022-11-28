import { SimpleValue, Selection } from "@/pages/sheet/editor/type";

export interface MetaWorkbookListItem {
  id: string;
  name: string;
  code: string;
}

export interface MetaWorkbook extends MetaWorkbookListItem {
  showRowCount: boolean;
  createdTime: string;
  updatedTime: string;
}

export enum MetaType {
  Text = "Text",
  Number = "Number",
  Boolean = "Boolean",
  Date = "Date",
  QrCode = "QrCode",
  Options = "Options",
  File = "File",
}

export interface MetaConfig {
  number: MetaNumber;
  date: MetaDate;
  options: MetaOptions;
  qrCode: MetaQrCode;
}

export interface MetaNumber {
  unit: string;
  decimal: number;
}

export interface MetaDate {
  format: string;
}

export interface MetaOptionsItem {
  color: string;
  value: string;
}
export interface MetaQrCode {
  size: number;
}

export interface MetaOptions {
  items: MetaOptionsItem[];
}

export interface MetaColumn {
  code: string;
  width: number;
  title: string;
  type: MetaType;
  meta: MetaConfig;
}

export interface ColumnPayload {
  width: number;
  title: string;
  type: MetaType;
  meta: Partial<MetaConfig>;
}

export interface MetaEntry {
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

export interface VcEntry extends MetaEntry {
  height: number;
  y: number;
  index: number;
}

export interface VcTableCore {
  onSelection(e: Selection): void;
  deSelection(): void;
}

export enum ContextMenuKey {
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

export interface EntryPayload {
  [k: string]: {
    [k: string]: SimpleValue;
  };
}

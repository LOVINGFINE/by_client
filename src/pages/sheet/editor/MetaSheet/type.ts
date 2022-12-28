import { SimpleValue, Selection } from "../components/VcTable";
import { MetaValue } from "./utils";

export enum MetaType {
  Text = "Text",
  Number = "Number",
  Boolean = "Boolean",
  Date = "Date",
  QrCode = "QrCode",
  Options = "Options",
  File = "File",
}

export interface MetaConfigure {
  showRowCount: boolean;
}

export interface Meta {
  number: MetaNumber;
  date: MetaDate;
  options: MetaOptions;
  qrCode: MetaQrCode;
  boolean: MetaBoolean;
}

export interface MetaNumber {
  unit: string;
  decimal: number | "";
}

export interface MetaBoolean {
  label: boolean;
  checked: string;
  unChecked: string;
}

export interface MetaDate {
  format: string;
}

export interface MetaOptionsItem {
  color: string;
  value: string;
}
export type QrCodeDisplayType = "VIEW" | "LABEL" | "VIEW_LABEL";

export interface MetaQrCode {
  size: number;
  display: QrCodeDisplayType;
  text: string;
}

export interface MetaOptions {
  multiple: boolean;
  items: MetaOptionsItem[];
}

export interface MetaColumn {
  code: string;
  width: number;
  title: string;
  type: MetaType;
  meta: Meta;
}

export interface ColumnPayload {
  width: number;
  title: string;
  type: MetaType;
  meta: Partial<Meta>;
}

export interface MetaEntry {
  id: string;
  height: number;
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
  y: number;
  index: number;
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
  [k: string]: Partial<MetaEntry>;
}

export interface InsertEntryPayload {
  [k: string]: SimpleValue;
}

export interface MetaColumnWithMetaValue extends MetaColumn {
  metaValue: MetaValue;
}

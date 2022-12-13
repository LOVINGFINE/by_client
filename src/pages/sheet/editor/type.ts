import { CSSProperties, ReactElement } from "react";
import { ColumnConfig, RowConfig } from "./Common/type";

export type SimpleValue = string | number | boolean;

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

export enum WorkbookType {
  common = "common",
  meta = "meta",
}

export interface WorkbookListItem {
  id: string;
  name: string;
  type: WorkbookType;
  createdTime: string;
  updatedTime: string;
}

export interface CommonWorkbook extends WorkbookListItem {
  config: {
    column: ColumnConfig;
    row: RowConfig;
  };
}

export interface MetaWorkbook extends WorkbookListItem {
  code: string;
  showRowCount: boolean;
}

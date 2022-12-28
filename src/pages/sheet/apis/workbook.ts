import request from "@/config/request";
import {
  ColumnSet,
  RowSet,
  DataPayload,
  CommonDataSource,
} from "../editor/SpreadSheet/type";
import {
  ColumnPayload,
  EntryPayload,
  EntryQuery,
  MetaColumn,
  MetaEntry,
  InsertEntryPayload,
} from "../editor/MetaSheet/type";
import { CommonWorkbook, MetaWorkbook } from "../editor/type";

// common
export function getCommonWorkbookById(sheetId: string, workbookId: string) {
  return request<CommonWorkbook>({
    method: "get",
    url: `/sheets/${sheetId}/common/${workbookId}`,
  });
}

export function getCommonWorkbookData(sheetId: string, workbookId: string) {
  return request<CommonDataSource>({
    method: "get",
    url: `/sheets/${sheetId}/common/${workbookId}/data`,
  });
}

export function updateCommonWorkbookColumn(
  sheetId: string,
  workbookId: string,
  data: ColumnSet
) {
  return request<ColumnSet>({
    method: "patch",
    url: `/sheets/${sheetId}/common/${workbookId}/column`,
    data,
  });
}

export function updateCommonWorkbookRow(
  sheetId: string,
  workbookId: string,
  data: RowSet
) {
  return request<RowSet>({
    method: "patch",
    url: `/sheets/${sheetId}/common/${workbookId}/row`,
    data,
  });
}

export function updateCommonWorkbookData(
  sheetId: string,
  workbookId: string,
  data: DataPayload
) {
  return request<CommonDataSource>({
    method: "patch",
    url: `/sheets/${sheetId}/common/${workbookId}/data`,
    data,
  });
}

// meta
export function getMetaWorkbookById(id: string, workbookId: string) {
  return request<MetaWorkbook>({
    method: "get",
    url: `/sheets/${id}/meta/${workbookId}`,
  });
}

export function updateMetaWorkbook(
  id: string,
  workbookId: string,
  data: Partial<{
    showRowCount: boolean;
  }>
) {
  return request<MetaWorkbook>({
    method: "patch",
    url: `/sheets/${id}/meta/${workbookId}`,
    data,
  });
}

export function insertMetaWorkbookColumns(
  id: string,
  workbookId: string,
  data: Partial<MetaColumn>[]
) {
  return request<MetaColumn[]>({
    method: "post",
    url: `/sheets/${id}/meta/${workbookId}/columns`,
    data,
  });
}

export function getMetaWorkbookColumns(id: string, workbookId: string) {
  return request<MetaColumn[]>({
    method: "get",
    url: `/sheets/${id}/meta/${workbookId}/columns`,
  });
}

export function updateMetaWorkbookColumns(
  id: string,
  workbookId: string,
  data: {
    [k: string]: Partial<ColumnPayload>;
  }
) {
  return request<MetaColumn[]>({
    method: "patch",
    url: `/sheets/${id}/meta/${workbookId}/columns`,
    data,
  });
}

export function deleteMetaWorkbookColumns(
  id: string,
  workbookId: string,
  data: string[]
) {
  return request<MetaColumn[]>({
    method: "delete",
    url: `/sheets/${id}/meta/${workbookId}/columns`,
    data,
  });
}

export function getMetaWorkbookEntries(
  id: string,
  workbookId: string,
  params?: Partial<EntryQuery>
) {
  return request<MetaEntry[]>({
    method: "get",
    url: `/sheets/${id}/meta/${workbookId}/entries`,
    params,
  });
}

export function insertMetaWorkbookEntries(
  id: string,
  workbookId: string,
  data: InsertEntryPayload[]
) {
  return request<MetaEntry[]>({
    method: "post",
    url: `/sheets/${id}/meta/${workbookId}/entries`,
    data,
  });
}

export function updateMetaWorkbookEntries(
  id: string,
  workbookId: string,
  data: EntryPayload
) {
  return request<MetaEntry[]>({
    method: "patch",
    url: `/sheets/${id}/meta/${workbookId}/entries`,
    data,
  });
}

export function deleteMetaWorkbookEntries(
  id: string,
  workbookId: string,
  data: string[]
) {
  return request<MetaEntry[]>({
    method: "delete",
    url: `/sheets/${id}/meta/${workbookId}/entries`,
    data,
  });
}

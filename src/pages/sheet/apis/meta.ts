import request from "@/config/request";
import {
  MetaColumn,
  MetaWorkbook,
  MetaEntry,
  EntryQuery,
  EntryPayload,
  MetaWorkbookListItem,
  ColumnPayload,
} from "../editor/Meta/type";
import { SimpleValue } from "../editor/type";

export function getMetaWorkbooks(id: string) {
  return request<MetaWorkbookListItem[]>({
    method: "get",
    url: `/sheets/${id}/meta`,
  });
}

export function getMetaWorkbookById(id: string, workbookId: string) {
  return request<MetaWorkbook>({
    method: "get",
    url: `/sheets/${id}/meta/${workbookId}`,
  });
}

export function insertMetaWorkbookById(sheetId: string) {
  return request<MetaWorkbook>({
    method: "post",
    url: `/sheets/${sheetId}/meta`,
  });
}

export function removeMetaWorkbookById(sheetId: string, workbookId: string) {
  return request<void>({
    method: "delete",
    url: `/sheets/${sheetId}/meta/${workbookId}`,
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

export function getMetaWorkbookColumns(id: string, workbookId: string) {
  return request<MetaColumn[]>({
    method: "get",
    url: `/sheets/${id}/meta/${workbookId}/columns`,
  });
}

export function updateMetaWorkbookColumn(
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
  data: {
    [k: string]: SimpleValue;
  }[]
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

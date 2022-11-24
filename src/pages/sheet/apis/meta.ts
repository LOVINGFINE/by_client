import request from "@/config/request";
import {
  MetaColumn,
  MetaWorkbook,
  WorkbookEntry,
  EntryQuery,
} from "../editor/Meta/type";

export function getSheetMetaById(id: string) {
  return request<MetaWorkbook>({
    method: "get",
    url: `/sheets/${id}/meta`,
  });
}

export function getSheetMetaColumns(id: string) {
  return request<MetaColumn[]>({
    method: "get",
    url: `/sheets/${id}/meta/columns`,
  });
}

export function getSheetMetaEntries(id: string, params?: Partial<EntryQuery>) {
  return request<WorkbookEntry[]>({
    method: "get",
    url: `/sheets/${id}/meta/entries`,
    params,
  });
}

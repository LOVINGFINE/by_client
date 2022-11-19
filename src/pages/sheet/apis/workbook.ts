import request from "@/config/request";
import { WorkbookListItem } from "@/pages/sheet/type";
import {
  ColumnConfig,
  RowConfig,
  DataPayload,
  WorkbookData,
  Workbook,
} from "../common-editor";

export function getSheetWorkbooksById(id: string) {
  return request<WorkbookListItem[]>({
    method: "get",
    url: `/sheets/${id}/common`,
  });
}

export function getSheetWorkbookById(sheetId: string, workbookId: string) {
  return request<Workbook>({
    method: "get",
    url: `/sheets/${sheetId}/common/${workbookId}`,
  });
}

export function insertSheetWorkbookById(sheetId: string) {
  return request<Workbook>({
    method: "post",
    url: `/sheets/${sheetId}`,
  });
}

export function updateWorkbookColumn(
  sheetId: string,
  workbookId: string,
  data: ColumnConfig
) {
  return request<ColumnConfig>({
    method: "patch",
    url: `/sheets/${sheetId}/common/${workbookId}/column`,
    data,
  });
}

export function updateWorkbookRow(
  sheetId: string,
  workbookId: string,
  data: RowConfig
) {
  return request<RowConfig>({
    method: "patch",
    url: `/sheets/${sheetId}/common/${workbookId}/row`,
    data,
  });
}

export function updateWorkbookData(
  sheetId: string,
  workbookId: string,
  data: DataPayload
) {
  return request<WorkbookData>({
    method: "patch",
    url: `/sheets/${sheetId}/common/${workbookId}/data`,
    data,
  });
}

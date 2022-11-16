import request from "@/config/request";
import { Sheet, WorkbookListItem } from "@/pages/sheet/type";
import {
  ColumnConfig,
  RowConfig,
  DataPayload,
  WorkbookData,
  Workbook,
} from "../editor";

export function getSheetById(id: string) {
  return request<Sheet>({
    method: "get",
    url: `/sheets/${id}`,
  });
}

export function getSheetWorkbooksById(id: string) {
  return request<WorkbookListItem[]>({
    method: "get",
    url: `/sheets/${id}/workbooks`,
  });
}

export function getSheetWorkbookById(sheetId: string, workbookId: string) {
  return request<Workbook>({
    method: "get",
    url: `/sheets/${sheetId}/workbooks/${workbookId}`,
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
    url: `/sheets/${sheetId}/workbooks/${workbookId}/command/column`,
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
    url: `/sheets/${sheetId}/workbooks/${workbookId}/command/row`,
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
    url: `/sheets/${sheetId}/workbooks/${workbookId}/command/data`,
    data,
  });
}

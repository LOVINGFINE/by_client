import request from "@/config/request";
import { WorkbookListItem } from "@/pages/sheet/editor/Common/type";
import {
  ColumnConfig,
  RowConfig,
  DataPayload,
  WorkbookData,
  CommonWorkbook,
} from "../editor/Common/type";

export function getCommonWorkbooks(id: string) {
  return request<WorkbookListItem[]>({
    method: "get",
    url: `/sheets/${id}/common`,
  });
}

export function getCommonWorkbookById(sheetId: string, workbookId: string) {
  return request<CommonWorkbook>({
    method: "get",
    url: `/sheets/${sheetId}/common/${workbookId}`,
  });
}

export function insertCommonWorkbook(sheetId: string) {
  return request<CommonWorkbook>({
    method: "post",
    url: `/sheets/${sheetId}/common`,
  });
}

export function updateCommonWorkbookColumn(
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

export function updateCommonWorkbookRow(
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

export function updateCommonWorkbookData(
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

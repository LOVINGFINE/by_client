import request from "@/config/request";
import { WorkbookListItem, WorkbookType } from "../editor/type";
import { Sheet } from "../type";

export function getUserSheets(search: string) {
  return request<Sheet[]>({
    method: "get",
    url: `/sheets`,
    params: {
      search,
    },
  });
}

export function insertUserSheet(name: string) {
  return request<Sheet>({
    method: "post",
    url: `/sheets`,
    data: {
      name,
    },
  });
}

export function updateUserSheetName(id: string, name: string) {
  return request<Sheet>({
    method: "patch",
    url: `/sheets/${id}`,
    data: {
      name,
    },
  });
}

export function deleteUserSheet(id: string) {
  return request<void>({
    method: "delete",
    url: `/sheets/${id}`,
  });
}

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

export function insertSheetWorkbook(
  id: string,
  data: Partial<{
    name: string;
    type: WorkbookType;
  }>
) {
  return request<WorkbookListItem>({
    method: "post",
    url: `/sheets/${id}/workbooks`,
    data,
  });
}

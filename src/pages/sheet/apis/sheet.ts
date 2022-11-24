import request from "@/config/request";
import { Sheet, SheetType } from "../type";

export function getUserSheets(search: string) {
  return request<Sheet[]>({
    method: "get",
    url: `/sheets`,
    params: {
      search,
    },
  });
}

export function insertUserSheet(name: string, type: SheetType) {
  return request<Sheet>({
    method: "post",
    url: `/sheets`,
    data: {
      name,
      type,
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

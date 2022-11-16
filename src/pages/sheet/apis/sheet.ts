import request from "@/config/request";
import { Sheet, SheetListItem, SheetUserSettings } from "../type";

export function getUserSheetSettings() {
  return request<SheetUserSettings>({
    method: "get",
    url: `/sheet/user/settings`,
  });
}

export function patchUserSheetSettings() {
  return request<SheetUserSettings>({
    method: "patch",
    url: `/sheet/user/settings`,
  });
}

export function getUserSheets(search: string) {
  return request<SheetListItem[]>({
    method: "get",
    url: `/sheets?search=${search}`,
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
  return request<SheetListItem>({
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

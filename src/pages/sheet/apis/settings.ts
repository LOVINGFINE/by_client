import request from "@/config/request";
import { SheetUserSettings } from "../type";

export function getUserSheetSettings() {
  return request<SheetUserSettings>({
    method: "get",
    url: `/sheet/user/settings`,
  });
}

export function updateUserSheetSettings(data: Partial<SheetUserSettings>) {
  return request<SheetUserSettings>({
    method: "patch",
    url: `/sheet/user/settings`,
    data,
  });
}

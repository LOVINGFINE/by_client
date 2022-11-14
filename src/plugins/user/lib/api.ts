import request from "@/config/request";
import { User } from "./type";
export function userInfoWidthToken() {
  return request<User>({
    method: "get",
    url: `/token`,
  });
}

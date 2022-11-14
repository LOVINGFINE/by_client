import request from "@/config/request";
import { User } from "@/plugins/user";

export function settingName(nickname: string) {
  return request<User>({
    method: "patch",
    url: `/user`,
    data: {
      nickname,
    },
  });
}

import request from "@/config/request";
import { UserWithToken, EmailPayload, SignType } from "../type";
export function userSignUpByEmail(data: EmailPayload) {
  return request<UserWithToken>({
    method: "post",
    url: `/register`,
    data: {
      ...data,
      type: SignType.email,
    },
  });
}

import request from "@/config/request";
import { UserWithToken, EmailPayload, SignType } from "../type";
export function userSignInByEmail(data: EmailPayload) {
  return request<UserWithToken>({
    method: "post",
    url: `/sign-in`,
    data: {
      ...data,
      type: SignType.email,
    },
  });
}

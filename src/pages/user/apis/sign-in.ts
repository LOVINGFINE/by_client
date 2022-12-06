import request from "@/config/request";
import { UserWithToken, SignInPayload } from "../type";

export function userSignInByAccent(data: SignInPayload) {
  return request<UserWithToken>({
    method: "post",
    url: `/sign-in`,
    data,
  });
}

export function userSignInAccentAccess(accent: string) {
  return request<UserWithToken>({
    method: "post",
    url: `/sign-in/access`,
    data: {
      accent,
    },
  });
}

import request from "@/config/request";
import { UserWithToken, EmailPayload } from "../type";
export function userSignUpByEmail(data: EmailPayload) {
  return request<UserWithToken>({
    method: "post",
    url: `/sign-up`,
    data,
  });
}

export function verifyWithEmailAccess(email: string) {
  return request<void>({
    method: "post",
    url: `/sign-up/access`,
    data: {
      email,
    },
  });
}

export function userSendCodeWithEmail(email: string) {
  return request<void>({
    method: "post",
    url: `/sign-up/captcha`,
    data: {
      email,
    },
  });
}

export function verifySendCodeWithEmail(email: string, code: string) {
  return request<void>({
    method: "post",
    url: `/sign-up/verify`,
    data: {
      email,
      code,
    },
  });
}

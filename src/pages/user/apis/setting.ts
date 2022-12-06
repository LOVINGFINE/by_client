import request from "@/config/request";
import { User } from "@/plugins/user";

export function setUserNickname(nickname: string) {
  return request<User>({
    method: "patch",
    url: `/user/nickname`,
    data: {
      nickname,
    },
  });
}

export function setUserUsername(username: string) {
  return request<User>({
    method: "patch",
    url: `/user/username`,
    data: {
      username,
    },
  });
}

export function setUserMobile(mobile: string) {
  return request<User>({
    method: "patch",
    url: `/user/mobile`,
    data: {
      mobile,
    },
  });
}

export function setUserAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);
  return request<User>({
    method: "patch",
    url: `/user/avatar`,
    data: formData,
  });
}

export function setUserPasswordOld(data: { old: string; password: string }) {
  return request<User>({
    method: "patch",
    url: `/user/password-with-old`,
    data,
  });
}

export function sendUserPasswordWithCode() {
  return request<void>({
    method: "get",
    url: `/user/password-with-code`,
  });
}

export function setUserPasswordWithCode(data: {
  code: string;
  password: string;
}) {
  return request<User>({
    method: "patch",
    url: `/user/password-with-emailCode`,
    data,
  });
}

export function sendUserEmailUpdateCode() {
  return request<void>({
    method: "get",
    url: `/user/email`,
  });
}

export function setUserEmail(data: { code: string; email: string }) {
  return request<User>({
    method: "patch",
    url: `/user/email`,
    data,
  });
}

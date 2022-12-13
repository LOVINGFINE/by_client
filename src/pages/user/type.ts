export interface User {
  id: string;
  username: string;
  nickname: string;
  mobile: string;
  email: string;
  avatar?: string;
  usernameUpdated: string;
  passwordUpdated: string;
  createdTime: string;
  updatedTime: string;
}

export interface UserWithToken extends User {
  token: string;
}

export enum ActiveType {
  signIn = "signIn",
}

export interface PlatformBrowser {
  name: string; // 浏览器名称
  version: string; // 浏览器版本
}
export interface PlatformOs {
  name: string; // os名称
  version: string; // os版本
}

export interface PlatformDevice {
  type: string; // 类型
  name: string; // 版本
}

export interface HistoryPlatform {
  browser: PlatformBrowser;
  os: PlatformOs;
  device: PlatformDevice;
}

export interface ActiveHistory {
  id: string;
  date: string;
  host: string;
  type: ActiveType;
  platform: HistoryPlatform;
}

export enum SignType {
  mobile = "mobile",
  email = "email",
  username = "username",
}

export interface EmailPayload {
  email: string;
  password: string;
}

export interface SignInPayload {
  accent: string;
  password: string;
}

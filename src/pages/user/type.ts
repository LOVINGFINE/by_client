import { User } from "@/plugins/user";

export interface UserWithToken extends User {
  token: string;
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

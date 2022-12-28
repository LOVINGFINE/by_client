import { mobileRegExp, emailRegExp, accentRegExp } from "./final";

export function verifyMobile(mobile: string) {
  return mobileRegExp.test(mobile);
}

export function verifyEmail(email: string) {
  return emailRegExp.test(email);
}

export function verifyAccent(accent: string) {
  return accentRegExp.test(accent);
}

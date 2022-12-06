// 账号
export const accentRegExp = /^[A-Za-z0-9-_&!=+|]{8,32}$/;

// 手机号
export const mobileRegExp =
  /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/;

// 邮箱
const emailRegExp =
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export function verifyMobile(mobile: string) {
  return mobileRegExp.test(mobile);
}

export function verifyEmail(email: string) {
  return emailRegExp.test(email);
}

export function verifyAccent(accent: string) {
  return accentRegExp.test(accent);
}

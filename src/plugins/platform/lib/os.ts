import { OsType } from "../type";

export function getOs() {
  const { userAgent } = navigator;
  if (userAgent.indexOf("Mac OS") > -1) {
    return OsType.MacOS;
  }
  return OsType.Windows;
}

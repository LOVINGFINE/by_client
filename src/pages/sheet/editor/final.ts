import platform, { OsType } from "@/plugins/platform";

export const meta_key_icon =
  platform.os === OsType.MacOS ? "command" : "angle-up";

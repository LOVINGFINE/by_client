import platform, { OsType } from "@/tools/platform";

export const meta_key_icon =
  platform.os === OsType.MacOS ? "command" : "angle-up";

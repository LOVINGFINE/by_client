import { ManageOption, ManageKey } from "./type";

export const manage_options: ManageOption[] = [
  {
    name: ManageKey.information,
    label: "个人信息",
    icon: "profile",
    description: "您在系统中个人信息以及其它的偏好设置",
  },
  {
    name: ManageKey.safety,
    label: "账号与安全",
    icon: "lock",
  },
];

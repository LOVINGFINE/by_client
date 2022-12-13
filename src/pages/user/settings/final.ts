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
    label: "账号安全",
    icon: "lock",
    description:
      "确保您当前账号的安全性,和相关活动记录,帮助您更好地使用我们的产品",
  },
];

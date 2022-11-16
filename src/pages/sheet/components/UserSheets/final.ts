import { ActionOptions } from "./type";
import { ListFilter, ListMode, ListSort } from "@/pages/sheet/type";

export const MODE_CONFIG: ActionOptions<ListMode> = {
  [ListMode.list]: {
    label: "列表",
    icon: "",
  },
  [ListMode.grid]: {
    label: "卡片",
    icon: "",
  },
};

export const FILTER_OPTIONS: ActionOptions<ListFilter> = {
  [ListFilter.none]: {
    label: "全部",
  },
  [ListFilter.createByMe]: {
    label: "归我所有",
  },
  [ListFilter.shareToMe]: {
    label: "其他人分享",
  },
};

export const SORT_OPTIONS: ActionOptions<ListSort> = {
  [ListSort.editDate]: {
    label: "最近编辑时间",
  },
  [ListSort.openDate]: {
    label: "最近打开时间",
  },
  [ListSort.title]: {
    label: "标题",
  },
};

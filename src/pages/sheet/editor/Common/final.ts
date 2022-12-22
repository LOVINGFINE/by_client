import {
  Vertical,
  Horizontal,
  Cell,
  StyleOption,
  ContextMenuKey,
} from "./type";
import { Selection } from "../components/VcTable";
import { MenuOptionType } from "../components/ContextMenu";
import platform, { OsType } from "@/plugins/platform";
import { getSelectionRef } from "./RefHelper/utils";

const metaKeyIcon = (() => {
  if (platform.os === OsType.MacOS) {
    return "command";
  }
  return "angle-up";
})();

const { COPY, PASTE, CLEAR_ONLY, CLEAR_ALL } = ContextMenuKey;
export const context_menu_options = (
  s: Selection
): MenuOptionType<ContextMenuKey>[] => {
  const selectionRef = getSelectionRef(s);
  return [
    {
      value: COPY,
      icon: "edit-copy",
      label: "拷贝",
      suffix: {
        icon: metaKeyIcon,
        label: "C",
      },
    },
    {
      value: PASTE,
      icon: "edit-paste",
      label: `粘贴 ${selectionRef.cellRef}`,
      suffix: {
        icon: metaKeyIcon,
        label: "(⇧/⌥/) V",
      },
    },
    "driver",
    {
      value: CLEAR_ONLY,
      icon: "close",
      label: `清除单元格 ${selectionRef.cellRef}`,
      children: [
        {
          value: CLEAR_ONLY,
          icon: "close",
          label: "仅清除数据",
        },
        {
          value: CLEAR_ALL,
          icon: "times-circle",
          label: "清除全部",
        },
      ],
    },
  ];
};

export const INIT_CELL: Cell = {
  style: {
    fontSize: 14,
    lineHeight: 1,
    background: "transparent",
    color: "#424f58",
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    vertical: Vertical.middle,
    horizontal: Horizontal.left,
  },
  value: "",
  comments: [],
};

export const NONE_STYLE: StyleOption = {
  fontSize: 13,
  lineHeight: 1,
  background: "transparent",
  color: "#424f58",
  bold: false,
  italic: false,
  underline: false,
  strike: false,
};

import {
  Vertical,
  Horizontal,
  CommonCell,
  CellStyle,
  ContextMenuKey,
  CommonClipboard,
} from "./type";
import { Selection } from "../components/VcTable";
import { MenuOptionType } from "../components/ContextMenu";
import { getSelectionRef } from "./RefHelper/utils";
import { meta_key_icon } from "../final";

const { COPY, PASTE, CLEAR_ONLY, CLEAR_ALL } = ContextMenuKey;
export const context_menu_options = (
  s: Selection,
  c: CommonClipboard | null
): MenuOptionType<ContextMenuKey>[] => {
  const selectionRef = getSelectionRef(s);
  return [
    {
      value: COPY,
      icon: "edit-copy",
      label: "拷贝",
      suffix: {
        icon: meta_key_icon,
        label: "C",
      },
    },
    {
      value: PASTE,
      icon: "edit-paste",
      label: `粘贴 ${selectionRef.cellRef}`,
      disabled: !c,
      suffix: {
        icon: meta_key_icon,
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

export const INIT_CELL: CommonCell = {
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

export const NONE_STYLE: CellStyle = {
  fontSize: 13,
  lineHeight: 1,
  background: "transparent",
  color: "#424f58",
  bold: false,
  italic: false,
  underline: false,
  strike: false,
};

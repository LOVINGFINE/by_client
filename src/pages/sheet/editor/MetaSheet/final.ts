import { MetaType, ContextMenuKey } from "./type";
import { MenuOptionType } from "../components/ContextMenu";
import { meta_key_icon } from "../final";

export const context_menu_options: MenuOptionType<ContextMenuKey>[] = [
  {
    value: ContextMenuKey.COPY,
    icon: "edit-copy",
    label: "拷贝",
    suffix: {
      icon: meta_key_icon,
      label: "C",
    },
  },
  {
    value: ContextMenuKey.PASTE,
    icon: "edit-paste",
    label: "粘贴",
    suffix: {
      icon: meta_key_icon,
      label: "V",
    },
  },
  "driver",
  {
    value: ContextMenuKey.INSERT_COLUMN,
    icon: "plus",
    label: "添加列",
  },
  {
    value: ContextMenuKey.INSERT_ENTRY,
    icon: "plus",
    label: "添加行",
  },
  "driver",
  {
    value: ContextMenuKey.CLEAR,
    icon: "close",
    label: "清除数据",
  },
  {
    value: ContextMenuKey.REMOVE_COLUMN,
    icon: "edit-remove-col",
    label: "删除列",
  },
  {
    value: ContextMenuKey.REMOVE_ENTRY,
    icon: "edit-remove-row",
    label: "删除行",
  },
];

const { Number, Text, Date, QrCode, Boolean, Options, File } = MetaType;

export const meta_config: {
  [k in MetaType]: {
    icon: string;
    label: string;
  };
} = {
  [Text]: {
    icon: "text",
    label: "文字",
  },
  [Number]: {
    icon: "number",
    label: "数字",
  },
  [Boolean]: {
    icon: "boolean",
    label: "布尔值",
  },
  [Date]: {
    icon: "date",
    label: "日期",
  },
  [QrCode]: {
    icon: "qrCode",
    label: "二维码",
  },
  [Options]: {
    icon: "select",
    label: "选择器",
  },
  [File]: {
    icon: "file1",
    label: "文件",
  },
};

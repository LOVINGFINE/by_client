import { MetaType } from "./type";

/** 默认列宽 */
export const DEFAULT_COLUMN_WIDTH = 180;
/** 默认行高 */
export const DEFAULT_ROW_HEIGHT = 32;
/** 默认code高度 */
export const DEFAULT_CODE_HEIGHT = 60;
/** 默认index 宽度 */
export const DEFAULT_INDEX_WIDTH = 64;

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

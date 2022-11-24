import { Selection } from "@/pages/sheet/editor/type";
import { Vertical, Horizontal, Cell, StyleOption } from "./type";
/** 初始化 选择范围 */
export const init_selection: Selection = {
  column: {
    current: -1,
    start: -1,
    end: -1,
  },
  row: {
    current: -1,
    start: -1,
    end: -1,
  },
};

export const INIT_CELL: Cell = {
  style: {
    fontSize: 13,
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

/** 默认列宽 */
export const DEFAULT_COLUMN_WIDTH = 120;
/** 默认行高 */
export const DEFAULT_ROW_HEIGHT = 28;
/** 默认code高度 */
export const DEFAULT_CODE_HEIGHT = 28;
/** 默认index 宽度 */
export const DEFAULT_INDEX_WIDTH = 28;

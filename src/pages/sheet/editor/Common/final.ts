import { Vertical, Horizontal, Cell, StyleOption } from "./type";

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

/** 默认列宽 */
export const DEFAULT_COLUMN_WIDTH = 120;
/** 默认行高 */
export const DEFAULT_ROW_HEIGHT = 28;
/** 默认code高度 */
export const DEFAULT_CODE_HEIGHT = 28;
/** 默认index 宽度 */
export const DEFAULT_INDEX_WIDTH = 28;

import { Selection } from "@/pages/sheet/editor/type";

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

/** 默认列宽 */
export const DEFAULT_COLUMN_WIDTH = 180;
/** 默认行高 */
export const DEFAULT_ROW_HEIGHT = 32;
/** 默认code高度 */
export const DEFAULT_CODE_HEIGHT = 60;
/** 默认index 宽度 */
export const DEFAULT_INDEX_WIDTH = 32;

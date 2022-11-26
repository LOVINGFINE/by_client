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

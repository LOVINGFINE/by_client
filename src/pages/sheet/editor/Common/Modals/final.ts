import { RowColumnMode, PositionMode } from "./Insert";

export const INSERT_CONFIG = {
  [RowColumnMode.column]: {
    title: "添加列",
    options: [
      {
        value: PositionMode.forward,
        label: "向前添加",
      },
      {
        value: PositionMode.back,
        label: "向后添加",
      },
    ],
  },
  [RowColumnMode.row]: {
    title: "添加行",
    options: [
      {
        value: PositionMode.forward,
        label: "在上方添加",
      },
      {
        value: PositionMode.back,
        label: "在下方添加",
      },
    ],
  },
};

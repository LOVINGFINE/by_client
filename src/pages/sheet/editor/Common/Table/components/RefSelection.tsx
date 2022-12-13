/*
 * Created by zhangq on 2022/09/11
 * ref selection
 */
import { FC } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { Selection } from "@/pages/sheet/editor/type";
import { ColumnConfig, RowConfig } from "../../type";
import { getRefStyle } from "../utils/core";

const cn = useClassNames(styles);

const RefSelection: FC<RefSelectionProps> = ({
  border,
  column,
  row,
  selection,
  rowIndexWidth,
  grid,
}) => {
  /** @State */
  const style = (() => {
    return getRefStyle(grid, column, row, selection, rowIndexWidth);
  })();

  /** render */
  return (
    <li
      className={cn({
        ref: true,
        "ref-border": border,
      })}
      style={style}
    />
  );
};

/**
 * @interface props
 */
export interface RefSelectionProps {
  border: boolean;
  row: RowConfig;
  column: ColumnConfig;
  selection: Selection;
  rowIndexWidth: number;
  grid: {
    column: number;
    row: number;
  };
}

export default RefSelection;

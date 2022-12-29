/*
 * Created by zhangq on 2022/09/11
 * ref selection
 */
import { FC } from "react";
import styles from "../style.less";
import { useClassNames } from "@/tools/style";
import { Selection } from "../type";
import { getRefStyle } from "../utils";

const cn = useClassNames(styles);

const TSelection: FC<TSelectionProps> = ({
  border,
  columns,
  rows,
  selection,
  indexWidth,
  onContextMenu,
  event = "none",
}) => {
  /** @State */
  const style = (() => {
    return getRefStyle(columns, rows, selection, indexWidth);
  })();

  const show = (() => {
    const { column, row } = selection;
    return column.current > -1 || row.current > -1;
  })();
  /** @render */
  return (
    <li
      onContextMenu={onContextMenu}
      className={cn({
        ref: true,
        "ref-border": border,
        "ref-show": show,
        "ref-stop": event === "none",
      })}
      style={style}
    />
  );
};

/**
 * @interface props
 */
export interface TSelectionProps {
  border: boolean;
  columns: { width: number }[];
  rows: { height: number }[];
  selection: Selection;
  indexWidth: number;
  event?: "none" | "auto";
  onContextMenu?(e: React.MouseEvent): void;
}

export default TSelection;

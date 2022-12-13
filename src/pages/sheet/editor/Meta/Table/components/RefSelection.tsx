/*
 * Created by zhangq on 2022/09/11
 * ref selection
 */
import { FC } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { Selection } from "@/pages/sheet/editor/type";
import { MetaColumn, MetaEntry } from "../../type";
import { getRefStyle } from "../utils/core";

const cn = useClassNames(styles);

const RefSelection: FC<RefSelectionProps> = ({
  border,
  columns,
  entries,
  selection,
  rowIndexWidth,
}) => {
  /** @State */
  const style = (() => {
    return getRefStyle(columns, entries, selection, rowIndexWidth);
  })();

  /** @render */
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
  columns: MetaColumn[];
  entries: MetaEntry[];
  selection: Selection;
  rowIndexWidth: number;
}

export default RefSelection;

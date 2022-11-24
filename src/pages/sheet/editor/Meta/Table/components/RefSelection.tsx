/*
 * Created by zhangq on 2022/09/11
 * ref selection
 */
import { FC } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { Selection } from "@/pages/sheet/editor/type";
import { MetaColumn, WorkbookEntry } from "../../type";
import { getRefStyle } from "../utils/core";

const classNames = useClassNames(styles);

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
  const show = (() => {
    const { column, row } = selection;
    return column.end - column.start > 0 || row.end - row.start > 0;
  })();

  /** render */
  return (
    <>
      {show && (
        <div className={styles["ref"]}>
          {border && (
            <>
              <div
                className={classNames(["border", "border-v"])}
                style={{
                  left: style.left,
                  top: style.top,
                  height: style.height,
                }}
              />
              <div
                className={classNames(["border", "border-v"])}
                style={{
                  left: style.left + style.width - 1,
                  top: style.top,
                  height: style.height,
                }}
              />
              <div
                className={classNames(["border", "border-h"])}
                style={{
                  left: style.left,
                  top: style.top,
                  width: style.width,
                }}
              />
              <div
                className={classNames(["border", "border-h"])}
                style={{
                  left: style.left,
                  top: style.top + style.height,
                  width: style.width,
                }}
              />
            </>
          )}
          <div
            className={styles["bgc"]}
            style={{
              width: style.width,
              height: style.height,
              left: style.left,
              top: style.top,
            }}
          />
        </div>
      )}
    </>
  );
};

/**
 * @interface props
 */
export interface RefSelectionProps {
  border: boolean;
  columns: MetaColumn[];
  entries: WorkbookEntry[];
  selection: Selection;
  rowIndexWidth: number;
}

export default RefSelection;

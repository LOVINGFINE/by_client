/*
 * Created by zhangq on 2022/09/11
 * ref selection
 */
import { FC, useEffect, useState } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { Selection, VcRow, VcColumn } from "../type";
const classNames = useClassNames(styles);

const RefSelection: FC<RefSelectionProps> = ({
  border,
  rows,
  columns,
  selection,
  rowIndexWidth,
}) => {
  /** @State */
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const show = () => {
    const { column, row } = selection;
    return column.end - column.start > 1 || row.end - row.start > 1;
  };
  /** @Effect */
  useEffect(() => {
    const { column, row } = selection;
    let l = 0;
    let w = 0;
    let t = 0;
    let h = 0;
    if (column.current > -1) {
      if (column.start > -1) {
        l = columns[column.start].x + rowIndexWidth;
      }
      if (column.end > -1) {
        w =
          columns[column.end].x + columns[column.end].width - l + rowIndexWidth;
      }
    }
    if (row.current > -1) {
      if (row.start > -1) {
        t = rows[row.start].y;
      }
      if (column.end > -1) {
        h = rows[row.end].y + rows[row.end].height - t;
      }
    }
    setLeft(l);
    setWidth(w);
    setTop(t);
    setHeight(h);
  }, [columns, rows, selection]);

  /**
   * @Methods
   */

  /** render */
  return (
    <>
      {show() && (
        <div className={styles["ref"]}>
          {border && (
            <>
              <div
                className={classNames(["border", "border-v"])}
                style={{
                  left,
                  top,
                  height: height + 1,
                }}
              />
              <div
                className={classNames(["border", "border-v"])}
                style={{
                  left: left + width,
                  top,
                  height: height + 1,
                }}
              />
              <div
                className={classNames(["border", "border-h"])}
                style={{
                  left,
                  top,
                  width: width + 1,
                }}
              />
              <div
                className={classNames(["border", "border-h"])}
                style={{
                  left,
                  top: top + height,
                  width: width + 1,
                }}
              />
            </>
          )}
          <div
            className={styles["bgc"]}
            style={{
              width,
              height,
              left,
              top,
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
  rows: VcRow[];
  columns: VcColumn[];
  selection: Selection;
  rowIndexWidth: number;
}

export default RefSelection;

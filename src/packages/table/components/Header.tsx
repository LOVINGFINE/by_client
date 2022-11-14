/*
 * Created by zhangq on 2022/09/09
 * theader
 */
import { FC, ReactElement, MouseEvent, useState, Fragment } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { VcColumn, Selection } from "../type";
import { dropSizeEvent } from "@/plugins/event";
import { getInitColumnSelection, getColumnMoveSelection } from "../utils";
import { DropEndProp } from "@/plugins/event/type";

const classNames = useClassNames(styles);

const Thead: FC<TheadProps> = ({
  fixedColumns,
  absColumns,
  height,
  width,
  rowIndexWidth,
  offsetHeight,
  rowEndIndex,
  selection,
  onColumnSize,
  onContextMenu,
  onSelection,
  children,
}) => {
  /** @State */
  const [canSelection, setCanSelection] = useState(false);

  const getSelectionColumn = (c: number) => {
    const { column, row } = selection;
    if (c >= column.start && c <= column.end) {
      return row.end >= rowEndIndex;
    }
    return false;
  };

  /**
   * @Methods
   */

  function addSelectionListener() {
    setCanSelection(true);
    const stop = () => {
      setCanSelection(false);
      window.removeEventListener("mouseup", stop);
    };
    window.addEventListener("mouseup", stop);
  }

  function onThMouseDown(e: MouseEvent, c: number) {
    if (e.button === 0) {
      onSelection(getInitColumnSelection(c, rowEndIndex));
      addSelectionListener();
    }
  }

  function onThMouseEnter(e: MouseEvent, c: number) {
    if (canSelection) {
      onSelection(getColumnMoveSelection(c, rowEndIndex, selection));
    }
  }

  function onResize(e: MouseEvent, col: VcColumn) {
    e.stopPropagation();
    const end = (d: DropEndProp) => {
      onColumnSize(col.index, d.width);
    };
    const opts = {
      width: col.width,
      offsetHeight,
    };
    dropSizeEvent(e, opts, end);
  }

  function getTh(column: VcColumn, isFixed?: boolean) {
    return (
      <li
        style={{
          width: column.width,
          left: column.x + rowIndexWidth,
        }}
        className={classNames({
          th: true,
          "th-fixed": isFixed,
        })}
        onContextMenu={(e) => onContextMenu(e, column.index)}
      >
        {children ? (
          children(column.index, column.code, column)
        ) : (
          <>
            <div
              className={classNames({
                "th-code": true,
                "th-code-selection": getSelectionColumn(column.index),
              })}
              onMouseDown={(e) => onThMouseDown(e, column.index)}
              onMouseEnter={(e) => onThMouseEnter(e, column.index)}
            >
              {column.code}
              {!canSelection && (
                <div
                  onMouseDown={(e) => onResize(e, column)}
                  className={classNames({
                    drop: true,
                    "drop-ew": true,
                  })}
                />
              )}
            </div>
          </>
        )}
      </li>
    );
  }
  /** render */
  return (
    <ul
      className={styles.thead}
      style={{
        height,
        width: width + rowIndexWidth,
      }}
    >
      {fixedColumns.map((ele) => {
        return <Fragment key={ele.index}>{getTh(ele, true)}</Fragment>;
      })}
      {absColumns.map((ele) => {
        return <Fragment key={ele.index}>{getTh(ele)}</Fragment>;
      })}
    </ul>
  );
};

/**
 * @interface props
 */
export interface TheadProps {
  fixedColumns: VcColumn[];
  absColumns: VcColumn[];
  height: number;
  rowIndexWidth: number;
  offsetHeight: number;
  width: number;
  rowEndIndex: number;
  selection: Selection;
  onColumnSize(i: number, w: number): void;
  onContextMenu(e: MouseEvent, c: number): void;
  onSelection(e: Selection): void;
  children?<T>(i: number, c: string, col: T): ReactElement;
}

export default Thead;

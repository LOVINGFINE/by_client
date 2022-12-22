import React, { FC, MouseEvent, useState } from "react";
import styles from "../style.less";
import { Selection } from "../type";
import { getInitColumnSelection, getColumnMoveSelection } from "../utils";
import { useClassNames } from "@/plugins/style";
import { VcColumn } from "../type";
import { DropEndProp, dropSizeEvent } from "@/plugins/event";

const classNames = useClassNames(styles);

const THead: FC<THeadProps> = ({
  columns,
  width,
  height,
  left,
  rowEndIndex,
  selection,
  offsetHeight,
  onResize,
  onContextMenu,
  onSelection,
  onSelectionStop,
  children,
}) => {
  /** @State */
  const [canSelection, setCanSelection] = useState(false);

  const getSelectionColumn = (c: number) => {
    const { column, row } = selection;
    if (c >= column.start && c <= column.end) {
      return row.end >= rowEndIndex && row.start === 0;
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
      onSelectionStop();
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

  function onDropResize(e: MouseEvent, col: VcColumn) {
    e.stopPropagation();
    const opts = {
      width: col.width,
      offsetHeight,
    };
    const end = (d: DropEndProp) => {
      onResize && onResize(col.index, d.width);
    };
    dropSizeEvent(e, opts, end);
  }

  /** render */
  return (
    <ul
      className={styles.thead}
      style={{
        height,
        width: width + left,
      }}
    >
      {columns.map((column) => {
        return (
          <li
            key={column.index}
            style={{
              width: column.width,
              left: column.x + left,
            }}
            className={styles["th"]}
            onContextMenu={(e) => onContextMenu(e, column.index)}
            onMouseDown={(e) => onThMouseDown(e, column.index)}
            onMouseEnter={(e) => onThMouseEnter(e, column.index)}
          >
            {children(column.index, {
              selection: getSelectionColumn(column.index),
            })}
            {!canSelection && !!onResize && (
              <div
                onMouseDown={(e) => onDropResize(e, column)}
                className={classNames({
                  drop: true,
                  "drop-ew": true,
                })}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

/**
 * @interface props
 */
export interface THeadProps {
  columns: VcColumn[];
  left: number;
  width: number;
  height: number;
  rowEndIndex: number;
  selection: Selection;
  offsetHeight: number;
  onResize?(e: number, i: number): void;
  onContextMenu(e: MouseEvent, c: number): void;
  onSelection(e: Selection): void;
  onSelectionStop(): void;
  children(e: number, opts?: { selection: boolean }): React.ReactNode;
}

export default THead;

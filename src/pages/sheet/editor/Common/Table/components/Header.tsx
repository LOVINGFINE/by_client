import { FC, MouseEvent, useState, Fragment } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { Selection } from "@/pages/sheet/editor/type";
import { VcColumn } from "../../type";
import { dropSizeEvent } from "@/plugins/event";
import { getInitColumnSelection, getColumnMoveSelection } from "../utils";
import { DropEndProp } from "@/plugins/event/type";
import { getCodeByIndex } from "@/plugins/convert";

const classNames = useClassNames(styles);

const Thead: FC<TheadProps> = ({
  columns,
  width,
  height,
  left,
  offsetHeight,
  rowEndIndex,
  selection,
  onColumnSize,
  onContextMenu,
  onSelection,
  onSelectionStop,
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

  function onResize(e: MouseEvent, col: VcColumn) {
    e.stopPropagation();
    const opts = {
      width: col.width,
      offsetHeight,
    };
    const end = (d: DropEndProp) => {
      onColumnSize(col.index, d.width);
    };
    dropSizeEvent(e, opts, end);
  }

  function getTh(column: VcColumn, isFixed?: boolean) {
    return (
      <li
        style={{
          width: column.width,
          left: column.x + left,
        }}
        className={classNames({
          th: true,
          "th-fixed": isFixed,
        })}
        onContextMenu={(e) => onContextMenu(e, column.index)}
      >
        <div
          className={classNames({
            "th-code": true,
            "th-code-selection": getSelectionColumn(column.index),
          })}
          onMouseDown={(e) => onThMouseDown(e, column.index)}
          onMouseEnter={(e) => onThMouseEnter(e, column.index)}
        >
          {getCodeByIndex(column.index)}
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
      </li>
    );
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
      {columns.map((ele) => {
        return <Fragment key={ele.index}>{getTh(ele)}</Fragment>;
      })}
    </ul>
  );
};

/**
 * @interface props
 */
export interface TheadProps {
  columns: VcColumn[];
  left: number;
  offsetHeight: number;
  width: number;
  height: number;
  rowEndIndex: number;
  selection: Selection;
  onColumnSize(i: number, w: number): void;
  onContextMenu(e: MouseEvent, c: number): void;
  onSelection(e: Selection): void;
  onSelectionStop(): void;
}

export default Thead;

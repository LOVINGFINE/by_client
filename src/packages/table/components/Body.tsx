/*
 * Created by zhangq on 2022/09/10
 * style
 */
import {
  FC,
  MouseEvent,
  useState,
  Fragment,
  CSSProperties,
  ReactElement,
} from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { dropSizeEvent } from "@/plugins/event";
import { VcColumn, VcRow, Selection, SelectionRef } from "../type";
import {
  initSelected,
  getMoveSelection,
  getInitRowSelection,
  getRowMoveSelection,
} from "../utils";
import TCell from "./Cell";
import RefSelection from "./RefSelection";
import { DropEndProp } from "@/plugins/event/type";

const classNames = useClassNames(styles);

const TBody: FC<TBodyProps> = ({
  width,
  height,
  rowIndexWidth,
  offsetWidth,
  rows,
  absRows,
  columns,
  fixedColumns,
  absColumns,
  columnEndIndex,
  selection,
  children,
  onRowSize,
  onContextMenu,
  onSelection,
}) => {
  /** @State */

  const [canSelection, setCanSelection] = useState(false);

  const selected = (c: number, r: number) => {
    const { column, row } = selection;
    return column.current === c && row.current === r;
  };
  const getSelectionRow = (r: number) => {
    const { column, row } = selection;
    if (r >= row.start && r <= row.end) {
      return column.end >= columnEndIndex;
    }
    return false;
  };

  /**
   * @Methods
   */

  function onResize(e: MouseEvent, row: VcRow) {
    e.stopPropagation();
    const end = (d: DropEndProp) => {
      onRowSize(row.index, d.height);
    };
    dropSizeEvent(
      e,
      {
        height: row.height,
        offsetWidth,
      },
      end
    );
  }

  function addSelectionListener() {
    setCanSelection(true);
    const stop = () => {
      setCanSelection(false);
      window.removeEventListener("mouseup", stop);
    };
    window.addEventListener("mouseup", stop);
  }

  function onCellMouseDown(e: MouseEvent, c: number, r: number) {
    if (e.button === 0) {
      onSelection(initSelected(c, r));
      addSelectionListener();
    }
  }

  function onCellMouseEnter(e: MouseEvent, c: number, r: number) {
    if (canSelection) {
      onSelection(getMoveSelection(c, r, selection));
    }
  }

  function onRowMouseDown(e: MouseEvent, r: number) {
    if (e.button === 0) {
      onSelection(getInitRowSelection(r, columnEndIndex));
      addSelectionListener();
    }
  }

  function onRowMouseEnter(e: MouseEvent, r: number) {
    if (canSelection) {
      onSelection(getRowMoveSelection(r, columnEndIndex, selection));
    }
  }

  function getCell(column: VcColumn, row: VcRow, style?: CSSProperties) {
    return (
      <TCell
        selected={selected(column.index, row.index)}
        x={column.x + rowIndexWidth}
        y={row.y}
        width={column.width}
        height={row.height}
        style={style}
        onMouseDown={(e) => onCellMouseDown(e, column.index, row.index)}
        onMouseEnter={(e) => onCellMouseEnter(e, column.index, row.index)}
        onContextMenu={(e) => onContextMenu(e, column.index, row.index)}
      >
        {children && children(column.index, row.index)}
      </TCell>
    );
  }
  /** @Effect */

  /** render */
  return (
    <ul
      className={styles["body"]}
      style={{ width: width + rowIndexWidth, height }}
    >
      <RefSelection
        rowIndexWidth={rowIndexWidth}
        border={!canSelection}
        columns={columns}
        rows={rows}
        selection={selection}
      />
      {absRows.map((row) => {
        return (
          <li
            key={row.index}
            style={{
              position: "absolute",
              top: row.y,
              height: row.height,
              width,
              display: "flex",
            }}
          >
            <div
              className={classNames({
                rowIndex: true,
                "rowIndex-selection": getSelectionRow(row.index),
              })}
              style={{
                height: row.height,
                top: row.y,
                width: rowIndexWidth,
                zIndex: 5,
              }}
              onMouseDown={(e) => onRowMouseDown(e, row.index)}
              onMouseEnter={(e) => onRowMouseEnter(e, row.index)}
            >
              {row.index + 1}
              {!canSelection && (
                <div
                  onMouseDown={(e) => onResize(e, row)}
                  className={classNames({
                    drop: true,
                    "drop-ns": true,
                  })}
                />
              )}
            </div>
            {fixedColumns.map((column) => {
              return (
                <Fragment key={column.index}>
                  {getCell(column, row, {
                    background: "#fff",
                    zIndex: 5,
                    top: 0,
                    position: "sticky",
                  })}
                </Fragment>
              );
            })}
            {absColumns.map((column) => {
              return (
                <Fragment key={column.index}>
                  {getCell(column, row, {
                    top: 0,
                  })}
                </Fragment>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};

/**
 * @interface props
 */
export interface TBodyProps {
  width: number;
  height: number;
  rowIndexWidth: number;
  offsetWidth: number;
  rows: VcRow[];
  absRows: VcRow[];
  columns: VcColumn[];
  fixedColumns: VcColumn[];
  absColumns: VcColumn[];
  columnEndIndex: number;
  selection: Selection;
  selectionRefs?: SelectionRef[];
  onRowSize(i: number, h: number): void;
  children?(c: number, r: number): ReactElement;
  onSelection(e: Selection): void;
  onContextMenu(e: MouseEvent, c: number, r: number): void;
}

export default TBody;

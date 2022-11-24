/*
 * Created by zhangq on 2022/09/10
 * style
 */
import { FC, MouseEvent, useState, Fragment, ReactElement } from "react";
import styles from "../style.less";
import { Selection } from "@/pages/sheet/editor/type";
import { VcColumn, VcEntry } from "../../type";
import {
  initSelected,
  getMoveSelection,
  getInitRowSelection,
  getRowMoveSelection,
} from "../utils";
import TCell from "./Cell";
import TRow from "./Row";

const TBody: FC<TBodyProps> = ({
  width,
  height,
  rowIndexWidth,
  entries,
  columns,
  columnEndIndex,
  selection,
  refs,
  children,
  onRowSize,
  onContextMenu,
  onSelection,
  onSelectionStop,
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
      return column.end >= columnEndIndex && column.start === 0;
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

  function onCellMouseDown(e: MouseEvent, c: number, r: number) {
    if (e.button === 0) {
      addSelectionListener();
      onSelection(initSelected(c, r));
    }
  }

  function onCellMouseEnter(c: number, r: number) {
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

  function onRowMouseEnter(r: number) {
    if (canSelection) {
      onSelection(getRowMoveSelection(r, columnEndIndex, selection));
    }
  }

  function getCell(column: VcColumn, row: VcEntry) {
    return (
      <TCell
        selected={selected(column.index, row.index)}
        left={column.x + rowIndexWidth}
        width={column.width}
        height={row.height}
        onMouseDown={(e) => onCellMouseDown(e, column.index, row.index)}
        onMouseEnter={() => onCellMouseEnter(column.index, row.index)}
        onContextMenu={(e) => onContextMenu(e, column.index, row.index)}
      >
        {children(column.index, row.index)}
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
      {refs(canSelection)}
      {entries.map((entry) => {
        return (
          <TRow
            key={entry.index}
            width={width}
            height={entry.height}
            top={entry.y}
            index={entry.index}
            selected={getSelectionRow(entry.index)}
            rowIndexWidth={rowIndexWidth}
            columnEndIndex={columns.length - 1}
            canSelection={canSelection}
            onRowSize={onRowSize}
            onRowMouseDown={(e) => onRowMouseDown(e, entry.index)}
            onRowMouseEnter={() => onRowMouseEnter(entry.index)}
          >
            {columns.map((column) => {
              return (
                <Fragment key={column.index}>{getCell(column, entry)}</Fragment>
              );
            })}
          </TRow>
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
  entries: VcEntry[];
  columns: VcColumn[];
  columnEndIndex: number;
  selection: Selection;
  refs: (can: boolean) => ReactElement[] | ReactElement;
  onRowSize?(i: number, h: number): void;
  children(c: number, r: number): ReactElement;
  onSelection(e: Selection): void;
  onSelectionStop(): void;
  onContextMenu(e: MouseEvent, c: number, r: number): void;
}

export default TBody;

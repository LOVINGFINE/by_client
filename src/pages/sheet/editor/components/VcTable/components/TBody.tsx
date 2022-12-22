/*
 * Created by zhangq on 2022/09/10
 * style
 */
import React, { FC, MouseEvent, useState } from "react";
import styles from "../style.less";
import {
  initSelected,
  getMoveSelection,
  getInitRowSelection,
  getRowMoveSelection,
} from "../utils";
import TCell from "./TCell";
import TRow from "./TRow";
import { VcColumn, VcRow, Selection } from "../type";

const TBody: FC<TBodyProps> = ({
  width,
  height,
  indexWidth,
  rows,
  columns,
  columnEndIndex,
  selection,
  refs,
  children,
  onRowSize,
  onSelection,
  onSelectionStop,
  onContextMenu,
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
    };
    window.addEventListener("mouseup", stop, { once: true });
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

  /** @render */
  return (
    <ul
      className={styles["body"]}
      style={{ width: width + indexWidth, height }}
    >
      {refs && refs(canSelection)}
      {rows.map((row) => {
        return (
          <TRow
            key={row.index}
            width={width}
            height={row.height}
            top={row.y}
            index={row.index}
            selected={getSelectionRow(row.index)}
            rowIndexWidth={indexWidth}
            columnEndIndex={columns.length - 1}
            canSelection={canSelection}
            onSize={onRowSize}
            onRowMouseDown={(e) => onRowMouseDown(e, row.index)}
            onRowMouseEnter={() => onRowMouseEnter(row.index)}
          >
            {columns.map((column) => {
              const s = selected(column.index, row.index);
              return (
                <TCell
                  key={column.index}
                  selected={s}
                  left={column.x + indexWidth}
                  width={column.width}
                  height={row.height}
                  onMouseDown={(e) =>
                    onCellMouseDown(e, column.index, row.index)
                  }
                  onContextMenu={(e) =>
                    onContextMenu(e, column.index, row.index)
                  }
                  onMouseEnter={() => onCellMouseEnter(column.index, row.index)}
                >
                  {children(column.index, row.index, s)}
                </TCell>
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
  indexWidth: number;
  rows: VcRow[];
  columns: VcColumn[];
  columnEndIndex: number;
  selection: Selection;
  refs?(can: boolean): React.ReactNode;
  onRowSize?(i: number, h: number): void;
  children(c: number, r: number, s: boolean): React.ReactNode;
  onSelection(e: Selection): void;
  onSelectionStop(): void;
  onContextMenu(e: MouseEvent, c: number, r: number): void;
}

export default TBody;

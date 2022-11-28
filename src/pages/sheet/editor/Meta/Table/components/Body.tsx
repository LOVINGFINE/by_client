/*
 * Created by zhangq on 2022/09/10
 * style
 */
import { FC, MouseEvent, useState, ReactElement } from "react";
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
      onSelection(initSelected(c, r));
      addSelectionListener();
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
            onRowMouseDown={(e) => onRowMouseDown(e, entry.index)}
            onRowMouseEnter={() => onRowMouseEnter(entry.index)}
          >
            {columns.map((column) => {
              return (
                <TCell
                  key={column.index}
                  selected={selected(column.index, entry.index)}
                  left={column.x + rowIndexWidth}
                  width={column.width}
                  height={entry.height}
                  onMouseDown={(e) =>
                    onCellMouseDown(e, column.index, entry.index)
                  }
                  onMouseEnter={() =>
                    onCellMouseEnter(column.index, entry.index)
                  }
                  onContextMenu={(e) =>
                    onContextMenu(e, column.index, entry.index)
                  }
                >
                  {children(column, entry)}
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
  rowIndexWidth: number;
  entries: VcEntry[];
  columns: VcColumn[];
  columnEndIndex: number;
  selection: Selection;
  refs: (can: boolean) => ReactElement[] | ReactElement;
  children(c: VcColumn, r: VcEntry): ReactElement;
  onSelection(e: Selection): void;
  onSelectionStop(): void;
  onContextMenu(e: MouseEvent, c: number, r: number): void;
}

export default TBody;

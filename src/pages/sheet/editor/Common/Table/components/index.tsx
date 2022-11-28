/*
 * Created by zhangq on 2022/08/18
 *
 */
import React, {
  useEffect,
  useRef,
  useState,
  ReactElement,
  MouseEvent,
  useImperativeHandle,
  forwardRef,
} from "react";
import styles from "../style.less";
import { debounce } from "lodash";
import { KeyboardType, keyboardEventKey } from "@/plugins/event";
import { useClassNames } from "@/plugins/style";
import { Selection } from "@/pages/sheet/editor/type";
import Thead from "./Header";
import TCorner from "./Corner";
import TBody from "./Body";
import RefSelection from "./RefSelection";
import { VcTableCore } from "../index";
import { RowConfig, ColumnConfig } from "../../type";
import {
  filterColumns,
  filterRows,
  getBodyStyle,
  keydownSelected,
  keydownSelection,
} from "../utils";
import { DEFAULT_INDEX_WIDTH, DEFAULT_CODE_HEIGHT } from "../../final";
import { init_selection } from "../../../final";

const classNames = useClassNames(styles);

const VcTable = forwardRef<VcTableCore | null | undefined, VcTableProps>(
  (props, ref) => {
    const {
      columns,
      rows,
      children,
      onCopy,
      onPaste,
      onSelection,
      onColumnSize,
      onRowSize,
    } = props;

    /** @State */
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [offset, setOffset] = useState({
      width: 0,
      height: 0,
    });
    const [selection, setSelection] = useState<Selection>({
      ...init_selection,
    });
    const _selection = useRef<Selection>(selection);
    const grid = useRef({
      column: 32,
      row: 100,
    });
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const [bodyStyle, setBodyStyle] = useState({
      width: 0,
      height: 0,
    });

    const displayColumns = (() => {
      return filterColumns(grid.current.column, {
        offsetWidth: offset.width,
        scrollLeft,
        maps: columns,
      });
    })();

    const displayRows = (() => {
      return filterRows(grid.current.row, {
        offsetHeight: offset.height,
        scrollTop,
        maps: rows,
      });
    })();

    /**
     * @Methods
     */
    const onResize = debounce(() => {
      if (tableRef.current) {
        const { offsetHeight, offsetWidth } = tableRef.current;
        setOffset({
          width: offsetWidth,
          height: offsetHeight,
        });
      }
    }, 500);

    function onScroll(e: React.UIEvent) {
      const target = e.target as HTMLDivElement;
      setScrollTop(target.scrollTop);
      setScrollLeft(target.scrollLeft);
    }

    function inSelection(e: Selection) {
      setSelection(e);
    }

    function onSelectionStop(e?: Selection) {
      if (e) {
        setSelection(e);
        onSelection(e);
      } else {
        onSelection(_selection.current);
      }
    }

    function deSelection() {
      setSelection({ ...init_selection });
      onSelection({ ...init_selection });
    }

    function onThContextMenu(e: MouseEvent, c: number) {
      props.onThContextMenu && props.onThContextMenu(e, c);
    }

    function onTdContextMenu(e: MouseEvent, c: number, r: number) {
      props.onTdContextMenu && props.onTdContextMenu(e, c, r);
    }

    function onMoveSelected(type: KeyboardType) {
      const s = keydownSelected(type, _selection.current);
      if (s) {
        inSelection(s);
      }
    }

    function onMoveSelection(type: KeyboardType) {
      const s = keydownSelection(type, _selection.current);
      if (s) {
        inSelection(s);
      }
    }

    function onKeyboard(event: React.KeyboardEvent) {
      const { copy, paste, paste_cut, paste_cut_control, paste_control } =
        KeyboardType;
      const key = keyboardEventKey(event);
      if (key) {
        if (key === copy) {
          onCopy();
        }
        if (key === paste) {
          onPaste();
        }
        if (key === paste_control) {
          onPaste({
            style: true,
          });
        }
        if (key === paste_cut) {
          onPaste({
            cut: true,
          });
        }
        if (key === paste_cut_control) {
          onPaste({
            cut: true,
            style: true,
          });
        }

        if (key.indexOf("selected_") > -1) {
          onMoveSelected(key);
        }
        if (key.indexOf("selection_") > -1) {
          onMoveSelection(key);
        }
      }
    }

    /**
     * @Effect
     */

    useEffect(() => {
      _selection.current = selection;
    }, [selection]);

    useEffect(() => {
      setBodyStyle(getBodyStyle(grid.current, columns, rows));
    }, [columns, rows, grid.current]);

    useEffect(() => {
      const remove = () => {
        window.removeEventListener("mousedown", deSelection);
      };
      window.addEventListener("mousedown", deSelection);
      return remove;
    }, []);

    useEffect(() => {
      const resizeObserver = new ResizeObserver(onResize);
      if (tableRef.current) {
        resizeObserver.observe(tableRef.current);
      }
      return () => {
        if (tableRef.current) {
          resizeObserver.unobserve(tableRef.current);
        }
      };
    }, [tableRef.current]);

    /** @ref */
    useImperativeHandle(
      ref,
      (): VcTableCore => ({
        onSelection: onSelectionStop,
        deSelection,
      }),
      []
    );

    /** render */
    return (
      <div
        className={classNames({
          table: true,
          "table-none": offset.width === 0,
        })}
        ref={tableRef}
        tabIndex={0}
        onKeyDown={onKeyboard}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {offset.width > 0 && (
          <>
            <TCorner width={DEFAULT_INDEX_WIDTH} height={DEFAULT_CODE_HEIGHT} />
            <div className={styles["table-scroll"]} onScroll={onScroll}>
              <Thead
                columns={displayColumns}
                width={bodyStyle.width}
                left={DEFAULT_INDEX_WIDTH}
                height={DEFAULT_CODE_HEIGHT}
                offsetHeight={offset.height}
                rowEndIndex={grid.current.column - 2}
                selection={selection}
                onColumnSize={onColumnSize}
                onContextMenu={onThContextMenu}
                onSelection={inSelection}
                onSelectionStop={onSelectionStop}
              />
              <TBody
                width={bodyStyle.width}
                height={bodyStyle.height}
                rows={displayRows}
                columns={displayColumns}
                columnEndIndex={grid.current.column - 1}
                rowIndexWidth={DEFAULT_INDEX_WIDTH}
                selection={selection}
                onRowSize={onRowSize}
                onSelection={inSelection}
                onSelectionStop={onSelectionStop}
                onContextMenu={onTdContextMenu}
                refs={(canSelection) => {
                  return (
                    <RefSelection
                      grid={grid.current}
                      rowIndexWidth={DEFAULT_INDEX_WIDTH}
                      border={!canSelection}
                      columns={columns}
                      rows={rows}
                      selection={selection}
                    />
                  );
                }}
              >
                {children}
              </TBody>
            </div>
          </>
        )}
      </div>
    );
  }
);

export interface VcTableProps {
  rows: RowConfig;
  columns: ColumnConfig;
  onCopy(): void;
  onPaste(e?: { style?: boolean; cut?: boolean }): void;
  onSelection(e: Selection): void;
  onColumnSize(i: number, w: number): void;
  onRowSize(i: number, h: number): void;
  children(c: number, r: number): ReactElement;
  onThContextMenu?(e: MouseEvent, c: number): void;
  onTdContextMenu?(e: MouseEvent, c: number, r: number): void;
}

export default VcTable;

/*
 * Created by zhangq on 2022/08/18
 * VcTable
 */
import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useImperativeHandle,
  forwardRef,
  useCallback,
  Fragment,
} from "react";
import styles from "./style.less";
import { debounce, throttle } from "lodash";
import { KeyboardType, keyboardEventKey } from "@/plugins/event";
import { useClassNames } from "@/plugins/style";
import THead from "./components/THead";
import TCorner from "./components/TCorner";
import TBody from "./components/TBody";
import { Selection } from "./type";
import { filterColumns, filterRows, getBodyStyle } from "./utils";
import { init_selection } from "./final";
import { keydownSelected, keydownSelection } from "./event";
import TSelection from "./components/TSelection";

const classNames = useClassNames(styles);

const VcTable = forwardRef<VcTableCore | null | undefined, VcTableProps>(
  (props, ref) => {
    const {
      columns,
      rows,
      indexWidth,
      headHeight,
      corner,
      children,
      onCopy,
      onPaste,
      onSelection,
      onColumnSize,
      headRender,
      refs,
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
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const [bodyStyle, setBodyStyle] = useState({
      width: 0,
      height: 0,
    });

    const displayColumns = (() => {
      return filterColumns(columns, {
        offsetWidth: offset.width,
        scrollLeft,
      });
    })();

    const displayRows = (() => {
      return filterRows(rows, {
        offsetHeight: offset.height,
        scrollTop,
      });
    })();

    /**
     * @Methods
     */
    const scrollBottomEnd = useCallback(
      throttle(() => {
        // 触底
        props?.scrollBottomEnd && props?.scrollBottomEnd();
      }, 500),
      []
    );

    const scrollRightEnd = useCallback(
      throttle(() => {
        // 最右
        props?.scrollRightEnd && props?.scrollRightEnd();
      }, 500),
      []
    );

    const onResize = useCallback(
      debounce(() => {
        if (tableRef.current) {
          const { offsetHeight, offsetWidth } = tableRef.current;
          setOffset({
            width: offsetWidth,
            height: offsetHeight,
          });
        }
      }, 500),
      []
    );

    function onScroll(e: React.UIEvent) {
      const target = e.target as HTMLDivElement;
      setScrollTop(target.scrollTop);
      setScrollLeft(target.scrollLeft);
      // 判断是否触底
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 10) {
        scrollBottomEnd();
      }
      // 判断是否 最右
      if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 10) {
        scrollRightEnd();
      }
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
      if (props.onThContextMenu) {
        e.preventDefault();
        e.stopPropagation();
        props.onThContextMenu(e, c);
      }
    }

    function onTdContextMenu(e: MouseEvent, c: number, r: number) {
      if (props.onContextMenu) {
        e.preventDefault();
        e.stopPropagation();
        const { column, row } = selection;
        if (
          c >= column.start &&
          c <= column.end &&
          r >= row.start &&
          r <= row.end
        ) {
          props.onContextMenu(e);
        }
      }
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
      const { copy, paste, paste_cut, paste_cut_all, paste_all } = KeyboardType;
      const key = keyboardEventKey(event);
      if (key) {
        if (key === copy) {
          onCopy();
        }
        if (key === paste) {
          onPaste();
        }
        if (key === paste_all) {
          onPaste({
            style: true,
          });
        }
        if (key === paste_cut) {
          onPaste({
            cut: true,
          });
        }
        if (key === paste_cut_all) {
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
      setBodyStyle(getBodyStyle(columns, rows));
    }, [columns, rows]);

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
        <TCorner width={indexWidth} height={headHeight}>
          {corner}
        </TCorner>
        <div className={styles["table-scroll"]} onScroll={onScroll}>
          <THead
            columns={displayColumns}
            width={bodyStyle.width}
            left={indexWidth}
            height={headHeight}
            offsetHeight={offset.height}
            rowEndIndex={rows.length - 1}
            selection={selection}
            onContextMenu={onThContextMenu}
            onSelection={inSelection}
            onResize={onColumnSize}
            onSelectionStop={onSelectionStop}
          >
            {headRender}
          </THead>
          <TBody
            width={bodyStyle.width}
            height={bodyStyle.height}
            rows={displayRows}
            columns={displayColumns}
            columnEndIndex={columns.length - 1}
            indexWidth={indexWidth}
            selection={selection}
            onRowSize={onRowSize}
            onSelection={inSelection}
            onSelectionStop={onSelectionStop}
            onContextMenu={onTdContextMenu}
            refs={(can) => {
              return (
                <Fragment>
                  <TSelection
                    indexWidth={indexWidth}
                    border={!can}
                    columns={columns}
                    rows={rows}
                    selection={selection}
                  />
                  {refs && refs(can)}
                </Fragment>
              );
            }}
          >
            {children}
          </TBody>
        </div>
      </div>
    );
  }
);

export interface VcTableCore {
  onSelection(e: Selection): void;
  deSelection(): void;
}

export interface VcTableProps {
  rows: { height: number }[];
  columns: { width: number }[];
  indexWidth: number;
  headHeight: number;
  corner: React.ReactNode;
  scrollBottomEnd?(): void;
  scrollRightEnd?(): void;
  refs?(can: boolean): React.ReactNode;
  headRender(e: number, opts?: { selection: boolean }): React.ReactNode;
  children(c: number, r: number, s: boolean): React.ReactNode;
  onCopy(): void;
  onPaste(e?: { style?: boolean; cut?: boolean }): void;
  onSelection(e: Selection): void;
  onColumnSize?(i: number, w: number): void;
  onRowSize?(i: number, h: number): void;
  onThContextMenu?(e: MouseEvent, c: number): void;
  onContextMenu?(e: MouseEvent): void;
}

export * from "./type";
export * from "./final";
export default VcTable;

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
import { KeyboardType } from "@/plugins/event";
import { useClassNames } from "@/plugins/style";
import Thead from "./Header";
import TCorner from "./Corner";
import TBody from "./Body";
import RefSelection from "./RefSelection";
import { Selection } from "@/pages/sheet/editor/type";
import { MetaColumn, VcColumn, VcTableCore, WorkbookEntry } from "../../type";
import {
  filterColumns,
  filterEntries,
  getBodyStyle,
  createKeyboardEvent,
  keydownSelected,
  keydownSelection,
} from "../utils";
import {
  init_selection,
  DEFAULT_INDEX_WIDTH,
  DEFAULT_CODE_HEIGHT,
} from "../../final";

const classNames = useClassNames(styles);
const keyboard = createKeyboardEvent();

const VcTable = forwardRef<VcTableCore | null | undefined, VcTableProps>(
  (props, ref) => {
    const {
      columns,
      entries,
      children,
      onCopy,
      onPaste,
      onCutPaste,
      onSelection,
      onColumnSize,
      onRowSize,
      columnRender,
      codeRender,
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

    const displayEntries = (() => {
      return filterEntries(entries, {
        offsetHeight: offset.height,
        scrollTop,
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
      const s = keydownSelected(type, selection);
      if (s) {
        inSelection(s);
      }
    }

    function onMoveSelection(type: KeyboardType) {
      const s = keydownSelection(type, selection);
      if (s) {
        inSelection(s);
      }
    }

    const removeListener = () => {
      keyboard.remove();
    };

    /** 拷贝/粘贴 */
    const addListener = () => {
      const { copy, paste, paste_cut } = KeyboardType;
      keyboard.on((key: KeyboardType) => {
        if (key === copy) {
          onCopy();
        }
        if (key === paste) {
          onPaste();
        }
        if (key === paste_cut) {
          onCutPaste();
        }
        if (key.indexOf("selected_") > -1) {
          onMoveSelected(key);
        }
        if (key.indexOf("selection_") > -1) {
          onMoveSelection(key);
        }
      });
    };

    /**
     * @Effect
     */

    useEffect(() => {
      _selection.current = selection;
    }, [selection]);

    useEffect(() => {
      setBodyStyle(getBodyStyle(columns, entries));
    }, [columns, entries]);

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
        onMouseDown={(e) => e.stopPropagation()}
        onMouseEnter={addListener}
        onMouseLeave={removeListener}
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
                rowEndIndex={entries.length - 1}
                selection={selection}
                onColumnSize={onColumnSize}
                onContextMenu={onThContextMenu}
                onSelection={inSelection}
                onSelectionStop={onSelectionStop}
                code={codeRender}
              >
                {columnRender}
              </Thead>
              <TBody
                width={bodyStyle.width}
                height={bodyStyle.height}
                entries={displayEntries}
                columns={displayColumns}
                columnEndIndex={columns.length - 1}
                rowIndexWidth={DEFAULT_INDEX_WIDTH}
                selection={selection}
                onRowSize={onRowSize}
                onSelection={inSelection}
                onSelectionStop={onSelectionStop}
                onContextMenu={onTdContextMenu}
                refs={(canSelection) => {
                  return (
                    <RefSelection
                      rowIndexWidth={DEFAULT_INDEX_WIDTH}
                      border={!canSelection}
                      columns={columns}
                      entries={entries}
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
  columns: MetaColumn[];
  entries: WorkbookEntry[];
  onCopy(): void;
  onPaste(): void;
  onCutPaste(): void;
  onSelection(e: Selection): void;
  onColumnSize(i: string, w: number): void;
  onRowSize?(i: number, h: number): void;
  onThContextMenu?(e: MouseEvent, c: number): void;
  onTdContextMenu?(e: MouseEvent, c: number, r: number): void;
  columnRender(e: VcColumn): ReactElement | ReactElement[];
  codeRender(e: VcColumn): ReactElement | ReactElement[];
  children(c: number, r: number): ReactElement;
}

export default VcTable;

/*
 * Created by zhangq on 2022/08/18
 *
 */
import {
  useEffect,
  useRef,
  useState,
  ReactElement,
  MouseEvent,
  useImperativeHandle,
  forwardRef,
} from "react";
import { debounce } from "lodash";
import Thead from "./components/Header";
import TCorner from "./components/Corner";
import TBody from "./components/Body";
import {
  Column,
  Row,
  VcColumn,
  VcRow,
  Selection,
  VcTableCore,
} from "./type";
import styles from "./style.less";
import {
  initColumns,
  initRows,
  filterColumns,
  filterRows,
  resizeColumns,
  resizeRows,
  createKeyboardEvent,
} from "./utils";
import { init_selection } from "./final";
import { KeyboardType } from "@/plugins/event";
const keyboard = createKeyboardEvent();

const VcTable = forwardRef<VcTableCore | null | undefined, VcTableProps>(
  (props, ref) => {
    const {
      rowIndexWidth = 28,
      headerHeight = 28,
      fixed = 0,
      headerRender,
      cellRender,
      onCopy,
      onPaste,
      onCutPaste,
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
    const [columns, setColumns] = useState<VcColumn[]>([]);
    const [rows, setRows] = useState<VcRow[]>([]);

    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const [bodyStyle, setBodyStyle] = useState({
      width: 0,
      height: 0,
    });

    const fixedColumns = (() => {
      return columns.filter((ele, i) => i < fixed);
    })();

    const absColumns = (() => {
      return filterColumns(columns, {
        scrollLeft,
        offsetWidth: offset.width,
        fixed,
      });
    })();

    const absRows = (() => {
      return filterRows(rows, {
        scrollTop,
        offsetHeight: offset.height,
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

    function onDropColumnSize(i: number, w: number) {
      if (onColumnSize) {
        onColumnSize(i, w);
      } else {
        setColumns(resizeColumns(columns, i, w));
      }
    }

    function onDropRowSize(i: number, h: number) {
      if (onRowSize) {
        onRowSize(i, h);
      } else {
        setRows(resizeRows(rows, i, h));
      }
    }

    function inSelection(e: Selection) {
      setSelection(e);
      if (onSelection) {
        onSelection(e);
      }
    }

    function deSelection() {
      setSelection({ ...init_selection });
      if (onSelection) {
        onSelection({ ...init_selection });
      }
    }

    /** 拷贝/粘贴 */
    function addListener() {
      const { copy, paste, paste_cut } = KeyboardType;
      keyboard.on((key: KeyboardType) => {
        if (key === copy) {
          onCopy && onCopy();
        }
        if (key === paste) {
          onPaste && onPaste();
        }
        if (key === paste_cut) {
          onCutPaste && onCutPaste();
        }
      });
    }

    function removeListener() {
      keyboard.remove();
    }

    function onThContextMenu(e: MouseEvent, c: number) {
      e.preventDefault();
      props.onThContextMenu && props.onThContextMenu(e, c);
    }

    function onTdContextMenu(e: MouseEvent, c: number, r: number) {
      e.preventDefault();
      props.onTdContextMenu && props.onTdContextMenu(e, c, r);
    }

    /**
     * @Effect
     */
    useEffect(() => {
      const remove = () => {
        window.removeEventListener("mousedown", deSelection);
        window.removeEventListener("click", deSelection);
      };
      window.addEventListener("mousedown", deSelection);
      window.addEventListener("click", deSelection);
      return remove;
    }, []);

    useEffect(() => {
      if (props.columns) {
        setColumns(initColumns(props.columns));
      }
    }, [props.columns]);

    useEffect(() => {
      if (props.rows) {
        setRows(initRows(props.rows));
      }
    }, [props.rows]);

    useEffect(() => {
      let height = 0;
      let width = 0;
      if (rows.length > 0) {
        const row = rows[rows.length - 1];
        height = row.y + row.height;
      }
      if (columns.length > 0) {
        const column = columns[columns.length - 1];
        width = column.x + column.width;
      }
      setBodyStyle({
        width,
        height,
      });
    }, [rows, columns]);

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
        onSelection: inSelection,
        deSelection,
      }),
      []
    );

    /** render */
    return (
      <div
        className={styles["table"]}
        ref={tableRef}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseEnter={addListener}
        onMouseLeave={removeListener}
      >
        <TCorner width={rowIndexWidth} height={headerHeight} />
        <div className={styles["table-scroll"]} onScroll={onScroll}>
          <Thead
            height={headerHeight}
            fixedColumns={fixedColumns}
            absColumns={absColumns}
            rowIndexWidth={rowIndexWidth}
            offsetHeight={offset.height}
            width={bodyStyle.width}
            rowEndIndex={rows.length - 1}
            selection={selection}
            onColumnSize={onDropColumnSize}
            onContextMenu={onThContextMenu}
            onSelection={inSelection}
          >
            {headerRender}
          </Thead>
          <TBody
            width={bodyStyle.width}
            height={bodyStyle.height}
            rows={rows}
            absRows={absRows}
            columns={columns}
            fixedColumns={fixedColumns}
            absColumns={absColumns}
            columnEndIndex={columns.length - 1}
            rowIndexWidth={rowIndexWidth}
            offsetWidth={offset.width}
            selection={selection}
            onRowSize={onDropRowSize}
            onSelection={inSelection}
            onContextMenu={onTdContextMenu}
          >
            {cellRender}
          </TBody>
        </div>
      </div>
    );
  }
);

export interface VcTableProps {
  columns?: Column[];
  rows?: Row[];
  fixed?: number;
  rowIndexWidth?: number;
  headerHeight?: number;
  onRowsReady?(rows: Row[]): void;
  onColumnsReady?(columns: Column[]): void;
  onCopy?(): void;
  onPaste?(): void;
  onCutPaste?(): void;
  onSelection?(e: Selection): void;
  headerRender?(c: number): ReactElement;
  cellRender?(c: number, r: number): ReactElement;
  onColumnSize?(i: number, w: number): void;
  onRowSize?(i: number, h: number): void;
  onThContextMenu?(e: MouseEvent, c: number): void;
  onTdContextMenu?(e: MouseEvent, c: number, r: number): void;
}
export { default as TextInput } from "./components/TextInput";
export * from "./components/TextInput";
export * from "./type";
export * from "./final";
export * from "./utils";

export default VcTable;

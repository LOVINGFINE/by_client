/*
 * Created by zhangq on 2022/08/09
 * common table
 */
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./style.less";
import VcTable, {
  Selection,
  init_selection,
  SimpleValue,
} from "../../components/VcTable";
import {
  getClearBySelection,
  onCopyToClipboard,
  onPasteByClipboard,
  getKeyByCoord,
} from "./core";
import {
  CommonClipboard,
  CommonCell,
  ContextMenuKey,
  CommonConfigure,
} from "../type";
import ContextMenu, { ContextMenuRef } from "../../components/ContextMenu";
import CellRender from "../Cell";
import { getCodeByIndex } from "@/tools/convert";
import { useClassNames } from "@/tools/style";
import { context_menu_options } from "../final";

const cn = useClassNames(styles);

const CommonTable = forwardRef<
  CommonTableCore | null | undefined,
  CommonTableProps
>((props, ref) => {
  const {
    dataSource,
    configure,
    selection,
    onSelection,
    onChanged,
    onConfigure,
  } = props;

  /** @State */
  const contextMenuRef = useRef<ContextMenuRef>(null);
  const [grid, setGrid] = useState({
    column: 32,
    row: 100,
  });
  const [clipboard, setClipboard] = useState<CommonClipboard | null>(null);
  const [columns, setColumns] = useState<{ width: number }[]>([]);
  const [rows, setRows] = useState<{ height: number }[]>([]);

  useEffect(() => {
    const list = [];
    for (let index = 0; index < grid.column; index++) {
      const width = configure.column[`${index}`]?.width || 120;
      list.push({
        width,
      });
    }
    setColumns(list);
  }, [configure.column, grid.column]);

  useEffect(() => {
    const list = [];
    for (let index = 0; index < grid.row; index++) {
      const height = configure.row[`${index}`]?.height || 28;
      list.push({
        height,
      });
    }
    setRows(list);
  }, [configure.row, grid.row]);

  /**
   * @Methods
   */
  function scrollBottomEnd() {
    setGrid({
      column: grid.column,
      row: grid.row + 50,
    });
  }

  function scrollRightEnd() {
    setGrid({
      column: grid.column + 10,
      row: grid.row,
    });
  }

  function onColumns(index: number, width: number) {
    onConfigure({
      column: {
        [`${index}`]: {
          width,
        },
      },
    });
  }

  function onRows(index: number, height: number) {
    onConfigure({
      row: {
        [`${index}`]: {
          height,
        },
      },
    });
  }

  function onCopy() {
    const clipboard = onCopyToClipboard(dataSource, selection);
    setClipboard(clipboard);
  }

  function onClear(only: boolean) {
    const maps = getClearBySelection(dataSource, selection, only);
    onChanged(maps);
  }

  function onPaste(opts?: { style?: boolean; cut?: boolean }) {
    const { style = false } = opts || {};
    if (clipboard) {
      const payload = onPasteByClipboard(selection, clipboard, {
        style,
      });
      onChanged(payload);
    }
  }

  function onTdContextMenu(e: React.MouseEvent) {
    if (contextMenuRef.current) {
      contextMenuRef.current.mount(
        e,
        context_menu_options(selection, clipboard)
      );
    }
  }

  function onContextMenuAction(k: ContextMenuKey, e: React.MouseEvent) {
    const { COPY, PASTE, CLEAR_ONLY, CLEAR_ALL } = ContextMenuKey;
    switch (k) {
      case COPY: {
        onCopy();
        break;
      }
      case PASTE: {
        const { shiftKey } = e;
        // 粘贴
        onPaste({
          style: shiftKey,
        });
        break;
      }
      case CLEAR_ONLY: {
        onClear(true);
        break;
      }
      case CLEAR_ALL: {
        onClear(false);
        break;
      }
    }
  }

  /** @ref */
  useImperativeHandle(
    ref,
    (): CommonTableCore => ({
      onSelection,
      deSelection: () => onSelection({ ...init_selection }),
    }),
    []
  );

  /** @render */
  const corner = (
    <div className={styles["corner"]}>
      <div />
    </div>
  );

  function headerRender(
    c: number,
    opts?: {
      selection: boolean;
    }
  ) {
    const { selection = false } = opts || {};
    return (
      <div
        className={cn({
          thCode: true,
          "thCode-selection": selection,
        })}
      >
        {getCodeByIndex(c)}
      </div>
    );
  }

  function renderCell(x: number, y: number) {
    const key = getKeyByCoord(x, y);
    const value = dataSource[key]?.value || "";
    const style = dataSource[key]?.style || {};
    const change = (val: SimpleValue) => {
      onChanged({
        [key]: {
          value: val,
        },
      });
    };
    return (
      <CellRender x={x} y={y} value={value} style={style} onChange={change} />
    );
  }

  return (
    <div style={{ height: `calc(100% - 166px)` }}>
      <ContextMenu ref={contextMenuRef} onAction={onContextMenuAction} />
      <VcTable
        selection={selection}
        onSelection={onSelection}
        scrollBottomEnd={scrollBottomEnd}
        scrollRightEnd={scrollRightEnd}
        columns={columns}
        rows={rows}
        onColumnSize={onColumns}
        onRowSize={onRows}
        indexWidth={28}
        headHeight={28}
        corner={corner}
        headRender={headerRender}
        onContextMenu={onTdContextMenu}
        onCopy={onCopy}
        onPaste={onPaste}
      >
        {renderCell}
      </VcTable>
    </div>
  );
});

export interface CommonTableProps {
  dataSource: { [k: string]: CommonCell };
  selection: Selection;
  configure: CommonConfigure;
  onSelection(s: Selection): void;
  onChanged(m: { [k: string]: Partial<CommonCell> }): void;
  onConfigure(c: Partial<CommonConfigure>): void;
}

export interface CommonTableCore {
  onSelection(e: Selection): void;
  deSelection(): void;
}

export default CommonTable;

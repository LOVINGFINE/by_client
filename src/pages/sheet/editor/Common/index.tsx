/*
 * Created by zhangq on 2022/08/09
 * common table
 */
import {
  FC,
  useContext,
  useReducer,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style.less";
import Toolbar from "./Toolbar";
import RefHelper from "./RefHelper";
import { CommonWorkbook, WorkbookType } from "@/pages/sheet/editor/type";
import VcTable, {
  Selection,
  VcTableCore,
  init_selection,
  SimpleValue,
} from "../components/VcTable";
import {
  getClearBySelection,
  onCopyToClipboard,
  onPasteByClipboard,
  getKeyByCoord,
} from "./core";
import {
  WorkbookClipboard,
  WorkbookCommonData,
  Cell,
  ContextMenuKey,
  WorkbookHistory,
} from "./type";
import { globalContext } from "../index";
import {
  getCommonWorkbookById,
  getCommonWorkbookData,
  updateCommonWorkbookColumn,
  updateCommonWorkbookData,
  updateCommonWorkbookRow,
} from "../../apis";
import ContextMenu, { ContextMenuRef } from "../components/ContextMenu";
import CellRender from "./Cell";
import { getCodeByIndex } from "@/plugins/convert";
import { useClassNames } from "@/plugins/style";
import { context_menu_options } from "./final";

const cn = useClassNames(styles);

export const editorContext = createContext({} as ContextValue);

export const initialState: ContextState = {
  id: "",
  name: "",
  type: WorkbookType.common,
  createdTime: "",
  updatedTime: "",
  config: {
    column: {},
    row: {},
  },
};

const CommonEditor: FC = () => {
  const global = useContext(globalContext);
  const sheetId = global.id;
  const workbookId = global.workbookId;

  /** @State */
  const vcTableRef = useRef<VcTableCore>(null);
  const contextMenuRef = useRef<ContextMenuRef>(null);
  const [grid, setGrid] = useState({
    column: 32,
    row: 100,
  });
  const [selection, setSelection] = useState<Selection>({ ...init_selection });
  const [data, setData] = useState<WorkbookCommonData>({});
  const [history, setHistory] = useState<WorkbookHistory>({
    current: -1,
    items: [],
  });
  const [clipboard, setClipboard] = useState<WorkbookClipboard | null>(null);
  const [state, dispatch] = useReducer(
    (s: ContextState, p: Partial<ContextState>): ContextState => ({
      ...s,
      ...p,
    }),
    initialState
  );

  const columns = (() => {
    const list = [];
    for (let index = 0; index < grid.column; index++) {
      const width = state.config.column[`${index}`]?.width || 120;
      list.push({
        width,
      });
    }
    return list;
  })();

  const rows = (() => {
    const list = [];
    for (let index = 0; index < grid.row; index++) {
      const height = state.config.row[`${index}`]?.height || 28;
      list.push({
        height,
      });
    }
    return list;
  })();

  useEffect(() => {
    if (global.workbookId) {
      initState();
    }
  }, [global.workbookId]);

  /**
   * @Methods
   */
  function onRefSelection(e: Selection) {
    if (vcTableRef.current) {
      vcTableRef.current.onSelection(e);
    }
  }

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

  async function initData() {
    return getCommonWorkbookData(sheetId, workbookId).then((res) => {
      setData(res);
    });
  }

  async function initState() {
    await getCommonWorkbookById(sheetId, workbookId).then((res) => {
      dispatch({ ...res });
    });
    await initData();
  }

  function onChange(maps: { [k: string]: Partial<Cell> }) {
    updateCommonWorkbookData(sheetId, workbookId, maps).then((res) => {
      setData(res);
    });
  }

  function onColumns(index: number, width: number) {
    updateCommonWorkbookColumn(sheetId, workbookId, {
      [`${index}`]: {
        width,
      },
    }).then((column) => {
      dispatch({
        config: {
          column,
          row: state.config.row,
        },
      });
    });
  }

  function onRows(index: number, height: number) {
    updateCommonWorkbookRow(sheetId, workbookId, {
      [`${index}`]: {
        height,
      },
    }).then((row) => {
      dispatch({
        config: {
          row,
          column: state.config.column,
        },
      });
    });
  }

  function onCopy() {
    const clipboard = onCopyToClipboard(data, selection);
    setClipboard(clipboard);
  }

  function onClear(only: boolean) {
    const maps = getClearBySelection(data, selection, only);
    onChange(maps);
  }

  function onPaste(opts?: { style?: boolean; cut?: boolean }) {
    const { style = false } = opts || {};
    if (clipboard) {
      const payload = onPasteByClipboard(selection, clipboard, {
        style,
      });
      onChange(payload);
    }
  }

  function onTdContextMenu(e: React.MouseEvent) {
    if (contextMenuRef.current) {
      contextMenuRef.current.mount(e, context_menu_options(selection));
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

  function render(x: number, y: number) {
    const key = getKeyByCoord(x, y);
    const value = data[key]?.value || "";
    const style = data[key]?.style || {};
    const change = (val: SimpleValue) => {
      onChange({
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
    <editorContext.Provider
      value={{
        ...state,
        onColumns,
        onRows,
        initState,
        onCopy,
        onPaste,
        onChange,
        onClear,
      }}
    >
      <Toolbar
        selection={selection}
        onChange={onChange}
        history={history}
        data={data}
      />
      <RefHelper
        onRefSelection={onRefSelection}
        selection={selection}
        onChange={onChange}
        data={data}
      />
      <div style={{ height: `calc(100% - 116px)` }}>
        <ContextMenu ref={contextMenuRef} onAction={onContextMenuAction} />
        <VcTable
          ref={vcTableRef}
          scrollBottomEnd={scrollBottomEnd}
          scrollRightEnd={scrollRightEnd}
          columns={columns}
          rows={rows}
          onSelection={setSelection}
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
          {render}
        </VcTable>
      </div>
    </editorContext.Provider>
  );
};

export interface ContextState extends CommonWorkbook {}

export interface ContextValue extends ContextState {
  initState(): void;
  onColumns(i: number, w: number): void;
  onRows(i: number, h: number): void;
  onCopy(): void;
  onClear(e: boolean): void;
  onPaste(e?: { style?: boolean; cut?: boolean }): void;
  onChange(m: { [k: string]: Partial<Cell> }): void;
}

export default CommonEditor;

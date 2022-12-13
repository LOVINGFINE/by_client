/*
 * Created by zhangq on 2022/08/09
 * common table
 */
import { FC, useContext, useReducer, createContext, useEffect } from "react";
import EditableTable from "./Table";
import Toolbar from "./Toolbar";
import { Cell } from "./type";
import RefTool from "./RefTool";
import {
  CommonWorkbook,
  Selection,
  WorkbookType,
} from "@/pages/sheet/editor/type";
import { init_selection } from "../final";
import {
  getClearBySelection,
  onCopyToClipboard,
  onPasteByClipboard,
  onInsertColumn,
  onInsertRow,
  onDeleteColumn,
  onDeleteRow,
} from "./core";
import {
  ColumnConfig,
  RowConfig,
  WorkbookClipboard,
  WorkbookCommonData,
} from "./type";
import { VcTableCore } from "./Table/index";
import { globalContext } from "../index";
import {
  getCommonWorkbookById,
  getCommonWorkbookData,
  updateCommonWorkbookColumn,
  updateCommonWorkbookData,
  updateCommonWorkbookRow,
} from "../../apis";

export const editorContext = createContext({} as ContextValue);

export const initialState: ContextState = {
  id: "",
  name: "",
  type: WorkbookType.common,
  createdTime: "",
  updatedTime: "",
  data: {},
  config: {
    column: {},
    row: {},
  },
  clipboard: null,
  selection: init_selection,
  history: {
    current: -1,
    items: [],
  },
  vcTableRef: null,
};

const CommonEditor: FC = () => {
  const global = useContext(globalContext);
  const sheetId = global.id;
  const workbookId = global.workbookId;

  /** @State */

  const [state, dispatch] = useReducer(
    (s: ContextState, p: Partial<ContextState>): ContextState => ({
      ...s,
      ...p,
    }),
    initialState
  );

  useEffect(() => {
    if (global.workbookId) {
      initState();
    }
  }, [global.workbookId]);

  /**
   * @Methods
   */
  function onVcTableRef(ref: VcTableCore | null) {
    dispatch({
      vcTableRef: ref,
    });
  }

  async function initData() {
    return getCommonWorkbookData(sheetId, workbookId).then((res) => {
      dispatch({
        data: res,
      });
    });
  }

  async function initState() {
    await getCommonWorkbookById(sheetId, workbookId).then((res) => {
      dispatch({ ...res });
    });
    await initData();
  }

  function onSelection(e: Selection) {
    dispatch({
      selection: e,
    });
  }

  function onChange(maps: { [k: string]: Partial<Cell> }) {
    updateCommonWorkbookData(sheetId, workbookId, maps).then((data) => {
      dispatch({
        data,
      });
    });
  }

  function onColumns(payload: ColumnConfig) {
    updateCommonWorkbookColumn(sheetId, workbookId, payload).then((column) => {
      dispatch({
        config: {
          column,
          row: state.config.row,
        },
      });
    });
  }

  function onRows(payload: RowConfig) {
    updateCommonWorkbookRow(sheetId, workbookId, payload).then((row) => {
      dispatch({
        config: {
          row,
          column: state.config.column,
        },
      });
    });
  }

  function onAddColumns(opts: unknown) {
    const res = onInsertColumn(
      state.data,
      state.config.column,
      state.selection,
      opts as { position: "after" | "before"; count: number }
    );
    onColumns(res.columns);
    onChange(res.data);
  }

  function onDeleteColumns() {
    const res = onDeleteColumn(
      state.data,
      state.config.column,
      state.selection
    );
    onColumns(res.columns);
    onChange(res.data);
  }

  function onAddRows(opts: unknown) {
    const res = onInsertRow(
      state.data,
      state.config.row,
      state.selection,
      opts as { position: "after" | "before"; count: number }
    );
    onRows(res.rows);
    onChange(res.data);
  }

  function onDeleteRows() {
    const res = onDeleteRow(state.data, state.config.row, state.selection);
    onRows(res.rows);
    onChange(res.data);
  }

  function onCopy() {
    const clipboard = onCopyToClipboard(state.data, state.selection);
    dispatch({
      clipboard,
    });
  }

  function onClear(only: boolean) {
    const maps = getClearBySelection(state.data, state.selection, only);
    onChange(maps);
  }

  function onPaste(opts?: { style?: boolean; cut?: boolean }) {
    const { style = false, cut = false } = opts || {};
    if (state.clipboard) {
      const payload = onPasteByClipboard(state.selection, state.clipboard, {
        style,
        cut,
      });
      onChange(payload);
    }
  }

  /** render */
  return (
    <editorContext.Provider
      value={{
        ...state,
        initState,
        onSelection,
        onColumns,
        onAddColumns,
        onDeleteColumns,
        onRows,
        onAddRows,
        onDeleteRows,
        onCopy,
        onPaste,
        onChange,
        onVcTableRef,
        onClear,
      }}
    >
      <Toolbar />
      <RefTool />
      <EditableTable />
    </editorContext.Provider>
  );
};

export interface ContextState extends CommonWorkbook {
  data: WorkbookCommonData;
  clipboard: WorkbookClipboard | null;
  selection: Selection;
  history: {
    current: number;
    items: {
      data: WorkbookCommonData;
    }[];
  };
  vcTableRef: VcTableCore | null;
}

export interface ContextValue extends ContextState {
  initState(): void;
  onSelection(e: Selection): void;
  onColumns(columns: ColumnConfig): void;
  onAddColumns(opts: unknown): void;
  onDeleteColumns(): void;
  onRows(rows: RowConfig): void;
  onAddRows(opts: unknown): void;
  onDeleteRows(): void;
  onCopy(): void;
  onClear(e: boolean): void;
  onPaste(e?: { style?: boolean; cut?: boolean }): void;
  onChange(m: { [k: string]: Partial<Cell> }): void;
  onVcTableRef(ref: VcTableCore | null): void;
}

export default CommonEditor;

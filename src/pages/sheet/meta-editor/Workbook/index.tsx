/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useContext, useReducer, createContext, useEffect } from "react";
import ExcelTable, {
  Selection,
  ColumnConfig,
  RowConfig,
  VcTableCore,
} from "./Table";
import Toolbar from "./Toolbar";
import { Cell } from "./type";
import RefTool from "./RefTool";
import { WorkbookClipboard, WorkbookData } from "../type";
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
import { globalContext } from "../index";
import {
  getSheetWorkbookById,
  updateWorkbookColumn,
  updateWorkbookData,
  updateWorkbookRow,
} from "../../apis";

export const editorContext = createContext({} as ContextValue);

export const initialState: ContextState = {
  id: "",
  name: "",
  data: {},
  columns: {},
  rows: {},
  clipboard: null,
  selection: init_selection,
  history: {
    current: -1,
    items: [],
  },
  vcTableRef: null,
};

const PageEditor: FC = () => {
  const global = useContext(globalContext);
  /** @State */
  /** @State */
  const [state, dispatch] = useReducer(
    (s: ContextState, p: Partial<ContextState>): ContextState => ({
      ...s,
      ...p,
    }),
    initialState
  );
  /**
   * @Methods
   */
  function onVcTableRef(ref: VcTableCore | null) {
    dispatch({
      vcTableRef: ref,
    });
  }

  function initState() {
    getSheetWorkbookById(global.id, global.workbookId).then((res) => {
      dispatch({
        data: res.data,
        columns: res.columns,
        rows: res.rows,
        name: res.name,
        id: res.id,
      });
    });
  }

  function onSelection(e: Selection) {
    dispatch({
      selection: e,
    });
  }

  function onChange(maps: { [k: string]: Partial<Cell> }) {
    updateWorkbookData(global.id, global.workbookId, maps).then((data) => {
      dispatch({
        data,
      });
    });
  }

  function onColumns(payload: ColumnConfig) {
    updateWorkbookColumn(global.id, global.workbookId, payload).then(
      (columns) => {
        dispatch({
          columns,
        });
      }
    );
  }
  function onAddColumns(opts: unknown) {
    const res = onInsertColumn(
      state.data,
      state.columns,
      state.selection,
      opts as { position: "after" | "before"; count: number }
    );
    onColumns(res.columns);
    onChange(res.data);
  }
  function onDeleteColumns() {
    const res = onDeleteColumn(state.data, state.columns, state.selection);
    onColumns(res.columns);
    onChange(res.data);
  }

  function onRows(payload: RowConfig) {
    updateWorkbookRow(global.id, global.workbookId, payload).then((rows) => {
      dispatch({
        rows,
      });
    });
  }

  function onAddRows(opts: unknown) {
    const res = onInsertRow(
      state.data,
      state.rows,
      state.selection,
      opts as { position: "after" | "before"; count: number }
    );
    onRows(res.rows);
    onChange(res.data);
  }

  function onDeleteRows() {
    const res = onDeleteRow(state.data, state.rows, state.selection);
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

  function onPaste() {
    if (state.clipboard) {
      const payload = onPasteByClipboard(state.selection, state.clipboard);
      onChange(payload);
    }
  }

  function onCutPaste() {
    if (state.clipboard) {
      const maps = getClearBySelection(state.data, state.selection, false);
      const update = onPasteByClipboard(state.selection, state.clipboard);
      onChange({
        ...maps,
        ...update,
      });
    }
  }

  useEffect(() => {
    if (global.workbookId && global.id) {
      initState();
    }
  }, [global.workbookId, global.id]);
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
        onCutPaste,
        onChange,
        onVcTableRef,
        onClear,
      }}
    >
      <Toolbar />
      <div style={{ height: `calc(100% - 85px)` }}>
        <RefTool />
        <ExcelTable />
      </div>
    </editorContext.Provider>
  );
};

export interface ContextState {
  id: string;
  name: string;
  rows: RowConfig;
  columns: ColumnConfig;
  data: WorkbookData;
  clipboard: WorkbookClipboard | null;
  selection: Selection;
  history: {
    current: number;
    items: {
      data: WorkbookData;
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
  onPaste(): void;
  onCutPaste(): void;
  onChange(m: { [k: string]: Partial<Cell> }): void;
  onVcTableRef(ref: VcTableCore | null): void;
}

export default PageEditor;

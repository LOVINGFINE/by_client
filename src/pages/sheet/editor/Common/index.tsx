/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import {
  FC,
  useContext,
  useReducer,
  createContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import EditableTable from "./Table";

import Toolbar from "./Toolbar";
import { Cell } from "./type";
import RefTool from "./RefTool";
import Footer from "./Footer";
import { Selection } from "@/pages/sheet/editor/type";
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
  WorkbookData,
  WorkbookListItem,
  CommonWorkbook,
} from "./type";
import { VcTableCore } from "./Table/index";
import { globalContext } from "../index";
import {
  getCommonWorkbookById,
  getCommonWorkbooks,
  updateCommonWorkbookColumn,
  updateCommonWorkbookData,
  updateCommonWorkbookRow,
} from "../../apis";

export const editorContext = createContext({} as ContextValue);

export const initialState: ContextState = {
  id: "",
  name: "",
  data: {},
  columns: {},
  rows: {},
  createdTime: "",
  updatedTime: "",
  clipboard: null,
  selection: init_selection,
  history: {
    current: -1,
    items: [],
  },
  vcTableRef: null,
  workbooks: [],
};

const PageEditor: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const global = useContext(globalContext);
  const workbookId = query.get("wid") || "";
  /** @State */

  const [workbooks, setWorkbooks] = useState<WorkbookListItem[]>([]);
  const [state, dispatch] = useReducer(
    (s: ContextState, p: Partial<ContextState>): ContextState => ({
      ...s,
      ...p,
    }),
    initialState
  );

  useEffect(() => {
    initWorkbooks();
  }, [global.id]);

  useEffect(() => {
    initState();
  }, [workbookId]);

  /**
   * @Methods
   */
  function onVcTableRef(ref: VcTableCore | null) {
    dispatch({
      vcTableRef: ref,
    });
  }

  function initState() {
    if (workbookId) {
      getCommonWorkbookById(global.id, workbookId).then((res) => {
        dispatch({
          data: res.data,
          columns: res.columns,
          rows: res.rows,
          name: res.name,
          id: res.id,
        });
      });
    }
  }
  getCommonWorkbookById;

  function initWorkbooks() {
    getCommonWorkbooks(global.id).then((res) => {
      setWorkbooks(res);
      if (!workbookId) {
        navigate(`/sheets/${global.id}?wid=${res[0].id}`, {
          replace: true,
        });
      }
    });
  }

  function onWorkbook(id: string) {
    navigate(`${location.pathname}?wid=${id}`);
  }

  function onSelection(e: Selection) {
    dispatch({
      selection: e,
    });
  }

  function onChange(maps: { [k: string]: Partial<Cell> }) {
    updateCommonWorkbookData(global.id, workbookId, maps).then((data) => {
      dispatch({
        data,
      });
    });
  }

  function onColumns(payload: ColumnConfig) {
    updateCommonWorkbookColumn(global.id, workbookId, payload).then(
      (columns) => {
        dispatch({
          columns,
        });
      }
    );
  }

  function onRows(payload: RowConfig) {
    updateCommonWorkbookRow(global.id, workbookId, payload).then((rows) => {
      dispatch({
        rows,
      });
    });
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

  /** render */
  return (
    <editorContext.Provider
      value={{
        ...state,
        workbooks,
        initState,
        initWorkbooks,
        onWorkbook,
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
      <RefTool />
      <EditableTable />
      <Footer />
    </editorContext.Provider>
  );
};

export interface ContextState extends CommonWorkbook {
  clipboard: WorkbookClipboard | null;
  selection: Selection;
  history: {
    current: number;
    items: {
      data: WorkbookData;
    }[];
  };
  workbooks: WorkbookListItem[];
  vcTableRef: VcTableCore | null;
}

export interface ContextValue extends ContextState {
  initState(): void;
  initWorkbooks(): void;
  onWorkbook(i: string): void;
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

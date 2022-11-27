/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useContext, useReducer, createContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import EditableTable from "./Table";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Selection, SimpleValue } from "@/pages/sheet/editor/type";
import { init_selection } from "../final";
import {} from "./core";
import {
  VcTableCore,
  MetaClipboard,
  MetaWorkbook,
  MetaColumn,
  MetaEntry,
  EntryPayload,
  MetaWorkbookListItem,
  ColumnPayload,
} from "./type";
import { globalContext } from "../index";
import {
  getMetaWorkbooks,
  getMetaWorkbookById,
  updateMetaWorkbook,
  getMetaWorkbookColumns,
  getMetaWorkbookEntries,
  updateMetaWorkbookEntries,
  updateMetaWorkbookColumn,
  removeMetaWorkbookById,
  insertMetaWorkbookEntries,
} from "../../apis";

export const editorContext = createContext({} as ContextValue);

export const initialState: ContextState = {
  code: "",
  id: "",
  name: "",
  showRowCount: false,
  columns: [],
  entries: [],
  clipboard: null,
  createdTime: "",
  updatedTime: "",
  workbooks: [],
  selection: init_selection,
  history: {
    current: -1,
    items: [],
  },
  vcTableRef: null,
};

const MetaEditor: FC = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const global = useContext(globalContext);
  const workbookId = query.get("wid") || "";
  const sheetId = global.id;
  /** @State */
  const [state, dispatch] = useReducer(
    (s: ContextState, p: Partial<ContextState>): ContextState => ({
      ...s,
      ...p,
    }),
    initialState
  );

  useEffect(() => {
    initWorkbooks();
  }, [workbookId]);

  useEffect(() => {
    if (workbookId) {
      initState();
      initEntries();
    }
  }, [workbookId]);

  /**
   * @Methods
   */
  function initWorkbooks() {
    getMetaWorkbooks(sheetId).then((res) => {
      dispatch({
        workbooks: res,
      });
      if (!workbookId && res.length > 0) {
        onWorkbook(res[0].id);
      }
    });
  }

  function onWorkbook(id: string, replace?: boolean) {
    navigate(`/sheets/${sheetId}?wid=${id}`, {
      replace,
    });
  }

  function onDelete() {
    removeMetaWorkbookById(sheetId, workbookId).then(() => {
      onWorkbook("", true);
      initWorkbooks();
    });
  }

  function onVcTableRef(ref: VcTableCore | null) {
    dispatch({
      vcTableRef: ref,
    });
  }

  function initState() {
    getMetaWorkbookById(sheetId, workbookId).then((res) => {
      dispatch({
        ...res,
      });
    });
    getMetaWorkbookColumns(sheetId, workbookId).then((res) => {
      dispatch({
        columns: res,
      });
    });
  }

  function initEntries() {
    getMetaWorkbookEntries(sheetId, workbookId).then((res) => {
      dispatch({
        entries: res,
      });
    });
  }

  function insertEntries(
    payload: {
      [k: string]: SimpleValue;
    }[]
  ) {}
  function onSelection(e: Selection) {
    dispatch({
      selection: e,
    });
  }

  function onShowRow(showRowCount: boolean) {
    dispatch({
      showRowCount,
    });
    updateMetaWorkbook(sheetId, workbookId, {
      showRowCount,
    });
  }

  function onChange(payload: EntryPayload) {
    dispatch({
      entries: state.entries.map((ele) => {
        if (payload[ele.id]) {
          return {
            ...ele,
            values: {
              ...ele.values,
              ...payload[ele.id],
            },
          };
        }
        return ele;
      }),
    });
    updateMetaWorkbookEntries(sheetId, workbookId, payload);
  }

  function onColumn(code: string, payload: Partial<ColumnPayload>) {
    dispatch({
      columns: state.columns.map((ele) => {
        if (ele.code === code) {
          return {
            ...ele,
            ...payload,
            meta: {
              ...ele.meta,
              ...(payload?.meta || {}),
            },
          };
        }
        return ele;
      }),
    });
    updateMetaWorkbookColumn(sheetId, workbookId, {
      [code]: payload,
    });
  }

  function onAddColumns(opts: unknown) {}
  function onDeleteColumns(codes: string[]) {}

  function onAddEntry(payload: { [k: string]: SimpleValue }[]) {
    insertMetaWorkbookEntries(sheetId, workbookId, payload).then((res) => {
      dispatch({
        entries: [...res, ...state.entries],
      });
    });
  }

  function onDeleteEntry() {}

  function onCopy() {}

  function onClear(only: boolean) {}

  function onPaste() {}

  function onCutPaste() {
    if (state.clipboard) {
    }
  }

  /** render */
  return (
    <editorContext.Provider
      value={{
        ...state,
        initState,
        initWorkbooks,
        onWorkbook,
        onDelete,
        onSelection,
        onShowRow,
        onColumn,
        onAddColumns,
        onDeleteColumns,
        onAddEntry,
        onDeleteEntry,
        onCopy,
        onPaste,
        onCutPaste,
        onChange,
        onVcTableRef,
        onClear,
      }}
    >
      <Toolbar />
      <EditableTable />
      <Footer />
    </editorContext.Provider>
  );
};

export interface ContextState extends MetaWorkbook {
  clipboard: MetaClipboard | null;
  selection: Selection;
  columns: MetaColumn[];
  entries: MetaEntry[];
  workbooks: MetaWorkbookListItem[];
  history: {
    current: number;
    items: {
      data: MetaWorkbook;
    }[];
  };
  vcTableRef: VcTableCore | null;
}

export interface ContextValue extends ContextState {
  initState(): void;
  initWorkbooks(): void;
  onWorkbook(i: string): void;
  onDelete(): void;
  onSelection(e: Selection): void;
  onShowRow(e: boolean): void;
  onColumn(code: string, e: Partial<ColumnPayload>): void;
  onAddColumns(opts: Partial<MetaColumn>): void;
  onDeleteColumns(codes: string[]): void;
  onAddEntry(m: { [k: string]: SimpleValue }[]): void;
  onDeleteEntry(ids: string[]): void;
  onCopy(): void;
  onClear(e: boolean): void;
  onPaste(): void;
  onCutPaste(): void;
  onChange(m: EntryPayload): void;
  onVcTableRef(ref: VcTableCore | null): void;
}

export default MetaEditor;

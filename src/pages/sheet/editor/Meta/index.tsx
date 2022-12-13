/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useContext, useReducer, createContext, useEffect } from "react";
import EditableTable from "./Table";
import Toolbar from "./Toolbar";
import {
  MetaWorkbook,
  Selection,
  SimpleValue,
  WorkbookType,
} from "@/pages/sheet/editor/type";
import { init_selection } from "../final";
import {
  getClearBySelection,
  onCopyToClipboard,
  onPasteByClipboard,
} from "./core";
import {
  VcTableCore,
  MetaClipboard,
  MetaColumn,
  MetaEntry,
  EntryPayload,
  ColumnPayload,
} from "./type";
import { globalContext } from "../index";
import {
  getMetaWorkbookById,
  updateMetaWorkbook,
  insertMetaWorkbookEntries,
  getMetaWorkbookEntries,
  updateMetaWorkbookEntries,
  deleteMetaWorkbookEntries,
  insertMetaWorkbookColumns,
  getMetaWorkbookColumns,
  updateMetaWorkbookColumns,
  deleteMetaWorkbookColumns,
} from "../../apis";

export const editorContext = createContext({} as ContextValue);

export const initialState: ContextState = {
  code: "",
  id: "",
  name: "",
  type: WorkbookType.meta,
  showRowCount: false,
  columns: [],
  entries: [],
  clipboard: null,
  createdTime: "",
  updatedTime: "",
  selection: init_selection,
  history: {
    current: -1,
    items: [],
  },
  vcTableRef: null,
};

const MetaEditor: FC = () => {
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
    if (workbookId) {
      initState();
      initEntries();
    }
  }, [workbookId]);

  /**
   * @Methods
   */

  function onVcTableRef(ref: VcTableCore | null) {
    dispatch({
      vcTableRef: ref,
    });
  }

  async function initState() {
    await getMetaWorkbookById(sheetId, workbookId).then((res) => {
      dispatch({
        ...res,
      });
    });
    await getMetaWorkbookColumns(sheetId, workbookId).then((res) => {
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
    }).then(() => {
      global.onUpdateTime();
    });
  }

  function onChange(payload: EntryPayload) {
    dispatch({
      entries: state.entries.map((ele) => {
        if (payload[ele.id]) {
          return {
            ...ele,
            height: payload[ele.id]?.height || ele.height,
            values: {
              ...ele.values,
              ...payload[ele.id].values,
            },
          };
        }
        return ele;
      }),
    });
    updateMetaWorkbookEntries(sheetId, workbookId, payload).then(() => {
      global.onUpdateTime();
    });
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
    updateMetaWorkbookColumns(sheetId, workbookId, {
      [code]: payload,
    }).then(() => {
      global.onUpdateTime();
    });
  }

  function onAddColumns(data: Partial<MetaColumn>[]) {
    insertMetaWorkbookColumns(sheetId, workbookId, data).then((res) => {
      dispatch({
        columns: res,
      });
    });
  }
  function onDeleteColumns() {
    const codes: string[] = [];
    for (
      let i = state.selection.column.start;
      i <= state.selection.column.end;
      i++
    ) {
      codes.push(state.columns[i].code);
    }
    deleteMetaWorkbookColumns(sheetId, workbookId, codes).then(() => {
      dispatch({
        columns: state.columns.filter((ele) => {
          return !codes.includes(ele.code);
        }),
      });
      setTimeout(() => {
        state.vcTableRef?.deSelection();
      });
    });
  }

  function onAddEntry(payload: { [k: string]: SimpleValue }[]) {
    insertMetaWorkbookEntries(sheetId, workbookId, payload)
      .then((res) => {
        dispatch({
          entries: [...res, ...state.entries],
        });
      })
      .then(() => {
        global.onUpdateTime();
      });
  }

  function onDeleteEntry() {
    const ids: string[] = [];
    for (let i = state.selection.row.start; i <= state.selection.row.end; i++) {
      ids.push(state.entries[i].id);
    }
    deleteMetaWorkbookEntries(sheetId, workbookId, ids).then(() => {
      dispatch({
        entries: state.entries.filter((ele) => {
          return !ids.includes(ele.id);
        }),
      });
      setTimeout(() => {
        state.vcTableRef?.deSelection();
      });
    });
  }

  function onCopy() {
    const clipboard = onCopyToClipboard(
      state.columns,
      state.entries,
      state.selection
    );
    dispatch({
      clipboard,
    });
  }

  function onClear() {
    const payload = getClearBySelection(
      state.columns,
      state.entries,
      state.selection
    );
    onChange(payload);
  }

  function onPaste() {
    if (state.clipboard) {
      const payload = onPasteByClipboard(
        state.columns,
        state.entries,
        state.selection,
        state.clipboard
      );
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
        onShowRow,
        onColumn,
        onAddColumns,
        onDeleteColumns,
        onAddEntry,
        onDeleteEntry,
        onCopy,
        onPaste,
        onChange,
        onVcTableRef,
        onClear,
      }}
    >
      <Toolbar />
      <EditableTable />
    </editorContext.Provider>
  );
};

export interface ContextState extends MetaWorkbook {
  clipboard: MetaClipboard | null;
  selection: Selection;
  columns: MetaColumn[];
  entries: MetaEntry[];
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
  onSelection(e: Selection): void;
  onShowRow(e: boolean): void;
  onColumn(code: string, e: Partial<ColumnPayload>): void;
  onAddColumns(opts: Partial<MetaColumn>[]): void;
  onDeleteColumns(): void;
  onAddEntry(m: { [k: string]: SimpleValue }[]): void;
  onDeleteEntry(): void;
  onCopy(): void;
  onClear(e: boolean): void;
  onPaste(): void;
  onChange(m: EntryPayload): void;
  onVcTableRef(ref: VcTableCore | null): void;
}

export default MetaEditor;

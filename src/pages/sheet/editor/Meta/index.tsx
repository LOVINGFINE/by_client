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
import Footer from "./Footer";
import { Selection, SimpleValue } from "@/pages/sheet/editor/type";
import { init_selection } from "./final";
import {} from "./core";
import { VcTableCore, MetaClipboard, MetaWorkbook, MetaColumn } from "./type";
import { globalContext } from "../index";
import {
  getSheetMetaById,
  getSheetMetaColumns,
  getSheetMetaEntries,
} from "../../apis";

import { WorkbookListItem } from "@/pages/sheet/editor/Common/type";

export const editorContext = createContext({} as ContextValue);

export const initialState: ContextState = {
  code: "",
  columns: [],
  entries: [],
  clipboard: null,
  selection: init_selection,
  history: {
    current: -1,
    items: [],
  },
  vcTableRef: null,
};

const MetaEditor: FC = () => {
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
    initState();
    initEntries();
  }, [global.id]);

  /**
   * @Methods
   */
  function onVcTableRef(ref: VcTableCore | null) {
    dispatch({
      vcTableRef: ref,
    });
  }

  function initState() {
    getSheetMetaById(global.id).then((res) => {
      dispatch({
        ...res,
      });
    });
    getSheetMetaColumns(global.id).then((res) => {
      dispatch({
        columns: res,
      });
    });
  }

  function initEntries() {
    getSheetMetaEntries(global.id).then((res) => {
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

  function onChange(id: string, maps: { [k: string]: SimpleValue }) {}

  function onColumn(code: string, column: Partial<MetaColumn>) {}

  function onAddColumns(opts: unknown) {}
  function onDeleteColumns(codes: string[]) {}

  function onAddEntry(list: { [k: string]: SimpleValue }[]) {}

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
        onSelection,
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
      <div style={{ height: `calc(100% - 85px)` }}>
        <EditableTable />
      </div>
      <Footer />
    </editorContext.Provider>
  );
};

export interface ContextState extends MetaWorkbook {
  clipboard: MetaClipboard | null;
  selection: Selection;
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
  onColumn(code: string, e: Partial<MetaColumn>): void;
  onAddColumns(opts: Partial<MetaColumn>): void;
  onDeleteColumns(codes: string[]): void;
  onAddEntry(m: { [k: string]: SimpleValue }[]): void;
  onDeleteEntry(ids: string[]): void;
  onCopy(): void;
  onClear(e: boolean): void;
  onPaste(): void;
  onCutPaste(): void;
  onChange(id: string, m: { [k: string]: SimpleValue }): void;
  onVcTableRef(ref: VcTableCore | null): void;
}

export default MetaEditor;

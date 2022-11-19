/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useReducer, useEffect, createContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import ApplicationLayout from "@/layouts/application";
import { getSheetById, updateUserSheetName } from "../apis";
import WorkbookEditor from "./Workbook";
import SheetHeader from "./Header";
import SheetFooter from "./Footer";
import { Workbook } from "./type";

export const initialState: ContextState = {
  id: "",
  name: "",
  createdTime: "",
  updatedTime: "",
  workbooks: [],
  workbookId: "",
  loading: true,
};

export const globalContext = createContext({} as ContextValue);

const MetaEditor: FC = () => {
  const params = useParams();
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
  function initState(id?: string) {
    const sheetId = id ?? state.id;
    dispatch({
      loading: true,
    });
    getSheetById(sheetId)
      .then((data) => {
        dispatch({
          ...data,
          loading: false,
        });
      })
      .catch(() => {
        dispatch({
          loading: false,
        });
      });
  }

  function changeWorkbook(workbookId: string) {
    dispatch({
      workbookId,
    });
  }

  function onRename(name: string) {
    dispatch({
      name,
    });
    updateUserSheetName(state.id, name);
  }

  /**
   * @effect
   */
  useEffect(() => {
    if (params?.sheetId) {
      initState(params?.sheetId);
    }
  }, [params.sheetId]);
  /** @render */

  return (
    <globalContext.Provider
      value={{
        ...state,
        initState,
        changeWorkbook,
        onRename,
      }}
    >
      <ApplicationLayout
        title={"表格"}
        control={false}
        loading={state.loading}
        header={<SheetHeader />}
      >
        <Fragment>
          <WorkbookEditor />
          <SheetFooter />
        </Fragment>
      </ApplicationLayout>
    </globalContext.Provider>
  );
};

export interface ContextState {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  workbooks: Workbook[];
  workbookId: string;
  loading: boolean;
}

export interface ContextValue extends ContextState {
  initState(): void;
  changeWorkbook(e: string): void;
  onRename(n: string): void;
}
export * from "./type";
export * from "./Workbook/type";
export default MetaEditor;

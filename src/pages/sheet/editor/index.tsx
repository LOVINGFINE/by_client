/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useReducer, useEffect, createContext, Fragment } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { getSheetById } from "../apis";
import WorkbookEditor from "./Workbook";
import SheetHeader from "./Header";
import SheetFooter from "./Footer";
import { Workbook, WorkbookOption } from "./type";
import ApplicationLayout from "@/layouts/application";

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

const ExcelEditor: FC = () => {
  const params = useParams();
  const [query] = useSearchParams();
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
}
export * from "./type";
export * from "./Workbook/type";
export default ExcelEditor;

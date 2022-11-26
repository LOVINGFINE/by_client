/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import {
  FC,
  useReducer,
  useEffect,
  createContext,
  Fragment,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import ApplicationLayout from "@/layouts/application";
import { getSheetById, updateUserSheetName } from "../apis";
import SheetHeader from "./Header";
import CommonEditor from "./Common";
import MetaEditor from "./Meta";

import { Sheet, SheetType } from "../type";

export const initialState: ContextState = {
  id: "",
  name: "",
  createdTime: "",
  updatedTime: "",
  lastOpenTime: "",
  owner: "",
  share: [],
  type: SheetType.common,
};

export const globalContext = createContext({} as ContextValue);
const { common, meta } = SheetType;
const SheetEditor: FC = () => {
  const params = useParams();
  /** @State */
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    getSheetById(sheetId)
      .then((data) => {
        dispatch({
          ...data,
        });
      })
      .finally(() => {
        setLoading(false);
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
        onRename,
      }}
    >
      <ApplicationLayout
        title={"表格"}
        control={false}
        loading={loading}
        header={<SheetHeader />}
      >
        {state.type === common ? <CommonEditor /> : <MetaEditor />}
      </ApplicationLayout>
    </globalContext.Provider>
  );
};

export interface ContextState extends Sheet {}

export interface ContextValue extends ContextState {
  initState(): void;
  onRename(n: string): void;
}

export default SheetEditor;

/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useReducer, useEffect, createContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ApplicationLayout from "@/layouts/application";
import SheetHeader from "./Header";
import CommonEditor from "./Common";
import MetaEditor from "./Meta";
import Footer from "./Footer";
import { Sheet } from "../type";
import { WorkbookListItem, WorkbookType } from "./type";
import {
  getSheetById,
  updateUserSheetName,
  getSheetWorkbooksById,
} from "../apis";

export const initialState: Sheet = {
  id: "",
  name: "",
  createdTime: "",
  updatedTime: "",
  lastOpenTime: "",
  owner: "",
  share: [],
};

export const globalContext = createContext({} as ContextValue);
const SheetEditor: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [query] = useSearchParams();
  const workbookId = query.get("wid") || "";
  const sheetId = params?.sheetId || "";

  /** @State */
  const [loading, setLoading] = useState(true);
  const [sheet, dispatch] = useReducer(
    (s: Sheet, p: Partial<Sheet>): Sheet => ({
      ...s,
      ...p,
    }),
    initialState
  );
  const [workbooks, setWorkbooks] = useState<WorkbookListItem[]>([]);

  const workbookType = (() => {
    const current = workbooks.find((ele) => ele.id === workbookId);
    if (current) {
      return current.type;
    }
    return null;
  })();
  /**
   * @Methods
   */
  function onUpdateTime() {
    dispatch({
      updatedTime: new Date().toString(),
    });
  }

  function initWorkbooks() {
    getSheetWorkbooksById(sheetId).then((res) => {
      setWorkbooks(res);
      if (!workbookId) {
        onWorkbook(res[0].id, true);
      }
    });
  }

  function initState() {
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
    updateUserSheetName(sheet.id, name);
  }

  function onWorkbook(id: string, replace?: boolean) {
    navigate(
      {
        search: `?wid=${id}`,
      },
      {
        replace,
      }
    );
  }
  /**
   * @effect
   */
  useEffect(() => {
    if (sheetId) {
      initState();
      initWorkbooks();
    }
  }, [sheetId]);
  /** @render */

  const editor = (() => {
    if (workbookType) {
      if (workbookType === WorkbookType.common) {
        return <CommonEditor />;
      }
      return <MetaEditor />;
    }
    return <></>;
  })();

  return (
    <globalContext.Provider
      value={{
        ...sheet,
        workbookId,
        workbooks,
        initWorkbooks,
        onWorkbook,
        initState,
        onRename,
        onUpdateTime,
      }}
    >
      <ApplicationLayout
        title={"表格"}
        control={false}
        loading={loading}
        header={<SheetHeader />}
      >
        {editor}
        <Footer />
      </ApplicationLayout>
    </globalContext.Provider>
  );
};

export interface ContextValue extends Sheet {
  workbookId: string;
  workbooks: WorkbookListItem[];
  initWorkbooks(): void;
  onWorkbook(i: string): void;
  initState(): void;
  onRename(n: string): void;
  onUpdateTime(): void;
}

export default SheetEditor;

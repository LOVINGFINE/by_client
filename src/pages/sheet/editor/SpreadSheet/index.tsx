/*
 * Created by zhangq on 2022/08/09
 * common table
 */
import {
  FC,
  useContext,
  useReducer,
  useEffect,
  useState,
  Fragment,
} from "react";
import Toolbar from "./Toolbar";
import RefHelper from "./RefHelper";
import CommonTable from "./Table";
import { CommonWorkbook } from "@/pages/sheet/editor/type";
import { Selection, init_selection } from "../components/VcTable";
import {
  CommonDataSource,
  CommonCell,
  CommonHistory,
  CommonConfigure,
} from "./type";
import { globalContext } from "../index";
import {
  getCommonWorkbookById,
  getCommonWorkbookData,
  updateCommonWorkbookColumn,
  updateCommonWorkbookData,
  updateCommonWorkbookRow,
} from "../../apis";

// configure
const CommonEditor: FC = () => {
  const global = useContext(globalContext);
  const sheetId = global.id;
  const workbookId = global.workbookId;

  /** @State */
  const [workbook, setWorkbook] = useState<CommonWorkbook>();
  const [selection, setSelection] = useState<Selection>({ ...init_selection });
  const [data, setData] = useState<CommonDataSource>({});
  const [history, setHistory] = useState<CommonHistory>({
    current: -1,
    items: [],
  });
  const [configure, setConfigure] = useReducer(
    (s: CommonConfigure, p: Partial<CommonConfigure>): CommonConfigure => ({
      ...s,
      ...p,
    }),
    { column: {}, row: {}, merge: [] }
  );

  useEffect(() => {
    if (global.workbookId) {
      initState();
    }
  }, [global.workbookId]);

  /**
   * @Methods
   */
  async function initData() {
    return getCommonWorkbookData(sheetId, workbookId).then((res) => {
      setData(res);
    });
  }

  async function initState() {
    await getCommonWorkbookById(sheetId, workbookId).then((res) => {
      setWorkbook(res);
    });
    await initData();
  }

  function onChanged(maps: { [k: string]: Partial<CommonCell> }) {
    updateCommonWorkbookData(sheetId, workbookId, maps).then((res) => {
      setData(res);
    });
  }

  function onConfigure(c: Partial<CommonConfigure>) {
    setConfigure({
      ...configure,
      ...c,
    });
    if (c["column"]) {
      updateCommonWorkbookColumn(sheetId, workbookId, c["column"]);
    }
    if (c["row"]) {
      updateCommonWorkbookRow(sheetId, workbookId, c["row"]);
    }
  }

  /** @render */
  return (
    <Fragment>
      <Toolbar
        selection={selection}
        onChange={onChanged}
        history={history}
        data={data}
      />
      <RefHelper
        onRefSelection={setSelection}
        selection={selection}
        onChange={onChanged}
        data={data}
      />
      <CommonTable
        selection={selection}
        onSelection={setSelection}
        dataSource={data}
        configure={configure}
        onConfigure={onConfigure}
        onChanged={onChanged}
      />
    </Fragment>
  );
};

export default CommonEditor;

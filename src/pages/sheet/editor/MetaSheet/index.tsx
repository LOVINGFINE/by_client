/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useContext, useEffect, useState, Fragment } from "react";
import MetaTable from "./Table";
import { Selection, SimpleValue, init_selection } from "../components/VcTable";
import Toolbar from "./Toolbar";
import { MetaWorkbook } from "@/pages/sheet/editor/type";
import {
  MetaColumn,
  MetaEntry,
  EntryPayload,
  ColumnPayload,
  MetaConfigure,
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

const MetaEditor: FC = () => {
  const global = useContext(globalContext);
  const sheetId = global.id;
  const workbookId = global.workbookId;

  /** @State */
  const [workbook, setWorkbook] = useState<MetaWorkbook>();
  const [selection, setSelection] = useState<Selection>({ ...init_selection });
  const [columns, setColumns] = useState<MetaColumn[]>([]);
  const [entries, setEntries] = useState<MetaEntry[]>([]);
  const [configure, setConfigure] = useState<MetaConfigure>({
    showRowCount: true,
  });
  useEffect(() => {
    if (workbookId) {
      initState();
      initEntries();
    }
  }, [workbookId]);

  /**
   * @Methods
   */

  async function initState() {
    await getMetaWorkbookById(sheetId, workbookId).then((res) => {
      setWorkbook(res);
    });
    await getMetaWorkbookColumns(sheetId, workbookId).then((res) => {
      setColumns(res);
    });
  }

  function initEntries() {
    getMetaWorkbookEntries(sheetId, workbookId).then((res) => {
      setEntries(res);
    });
  }

  function onEntries(payload: EntryPayload) {
    const target = entries.map((ele) => {
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
    });
    setEntries(target);
    updateMetaWorkbookEntries(sheetId, workbookId, payload).then(() => {
      global.onUpdateTime();
    });
  }

  function onAddColumn(data: Partial<MetaColumn>[]) {
    insertMetaWorkbookColumns(sheetId, workbookId, data).then((res) => {
      setColumns(res);
    });
  }

  function onColumn(code: string, payload: Partial<ColumnPayload>) {
    updateMetaWorkbookColumns(sheetId, workbookId, {
      [code]: payload,
    }).then(() => {
      const target = columns.map((ele) => {
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
      });
      setColumns(target);
      global.onUpdateTime();
    });
  }

  function onRemoveColumn(codes: string[]) {
    deleteMetaWorkbookColumns(sheetId, workbookId, codes).then(() => {
      const target = columns.filter((ele) => {
        return !codes.includes(ele.code);
      });
      setColumns(target);
    });
  }

  function onAddEntries(payload: { [k: string]: SimpleValue }[]) {
    insertMetaWorkbookEntries(sheetId, workbookId, payload).then((res) => {
      setEntries([...res, ...entries]);
      global.onUpdateTime();
    });
  }

  function onRemoveEntries(ids: string[]) {
    deleteMetaWorkbookEntries(sheetId, workbookId, ids).then(() => {
      const target = entries.filter((ele) => {
        return !ids.includes(ele.id);
      });
      setEntries(target);
    });
  }

  function onConfigure(payload: Partial<MetaConfigure>) {
    if (payload["showRowCount"] !== undefined) {
      updateMetaWorkbook(sheetId, workbookId, payload).then(() => {
        setConfigure({
          ...configure,
          ...payload,
        });
        global.onUpdateTime();
      });
    }
  }
  /** render */
  return (
    <Fragment>
      <Toolbar configure={configure} onConfigure={onConfigure} />
      <MetaTable
        columns={columns}
        entries={entries}
        selection={selection}
        onSelection={setSelection}
        configure={configure}
        onColumn={onColumn}
        onAddColumn={onAddColumn}
        onRemoveColumn={onRemoveColumn}
        onAddEntries={onAddEntries}
        onEntries={onEntries}
        onRemoveEntries={onRemoveEntries}
      />
    </Fragment>
  );
};

export default MetaEditor;

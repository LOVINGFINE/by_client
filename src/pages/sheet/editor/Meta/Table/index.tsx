/*
 * Created by zhangq on 2022/08/09
 * EditableTable
 */
import { FC, MouseEvent, useRef, useContext, useEffect, Fragment } from "react";
import styles from "./style.less";
import VcTable, { Selection, VcTableCore } from "../../components/VcTable";
import CodeRender from "../Column/Code";
import ColumnRender from "../Column";
import ColumnSettingModal, {
  ColumnSettingModalRef,
} from "../Column/SettingModal";
import InsertModel, { InsertModelRef, RowColumnMode } from "../Modals";
import ContextMenu, { ContextMenuRef } from "../../components/ContextMenu";
import MetaCell from "../Cell";
import {
  ContextMenuKey,
  ColumnPayload,
  MetaEntry,
  MetaColumn,
  MetaColumnWithMetaValue,
} from "../type";
import { editorContext } from "../index";
import { context_menu_options } from "../final";
import { MetaValue } from "../utils";

const EditableTable: FC = () => {
  const vcTableRef = useRef<VcTableCore>(null);
  const insertModelRef = useRef<InsertModelRef | null>(null);
  const columnSettingRef = useRef<ColumnSettingModalRef>(null);
  const contextMenuRef = useRef<ContextMenuRef>(null);
  /** @State */
  const editContextValue = useContext(editorContext);

  const columns: MetaColumnWithMetaValue[] = editContextValue.columns.map(
    (ele) => {
      return {
        ...ele,
        metaValue: new MetaValue(ele.code, ele.type, ele.meta),
      };
    }
  );
  useEffect(() => {
    if (vcTableRef.current) {
      editContextValue.onVcTableRef(vcTableRef.current);
    } else {
      editContextValue.onVcTableRef(null);
    }
  }, [vcTableRef.current]);

  /**
   * @Methods
   */
  function onSelection(e: Selection) {
    editContextValue.onSelection(e);
  }

  function onTdContextMenu(e: MouseEvent) {
    if (contextMenuRef.current) {
      contextMenuRef.current.mount(e);
    }
  }

  function onContextMenuAction(k: ContextMenuKey) {
    const {
      COPY,
      PASTE,
      CLEAR,
      INSERT_COLUMN,
      REMOVE_COLUMN,
      REMOVE_ENTRY,
      INSERT_ENTRY,
    } = ContextMenuKey;
    switch (k) {
      case COPY: {
        editContextValue.onCopy();
        break;
      }
      case PASTE: {
        editContextValue.onPaste();
        break;
      }
      case CLEAR: {
        editContextValue.onClear();
        break;
      }
      case INSERT_COLUMN: {
        openInsertModal(RowColumnMode.column);
        break;
      }
      case REMOVE_COLUMN: {
        editContextValue.onDeleteColumns();
        break;
      }
      case REMOVE_ENTRY: {
        editContextValue.onDeleteEntry();
        break;
      }
      case INSERT_ENTRY: {
        openInsertModal(RowColumnMode.row);
        break;
      }
    }
  }

  function openInsertModal(type: RowColumnMode) {
    if (insertModelRef.current) {
      insertModelRef.current.mount(type);
    }
  }
  function onSetting(c: MetaColumn) {
    columnSettingRef.current?.mount(c);
  }

  function onColumnSettingOK(code: string, column: Partial<ColumnPayload>) {
    editContextValue.onColumn(code, column);
  }

  function onEntryChange(id: string, v: Partial<MetaEntry>) {
    const payload: Partial<MetaEntry> = {};
    if (v.height !== undefined) {
      payload["height"] = v.height;
    }
    if (v.values) {
      payload["values"] = v.values;
    }
    editContextValue.onChange({
      [id]: payload,
    });
  }
  /** @render */
  return (
    <div
      style={{
        height: `calc(100% - 100px)`,
      }}
    >
      <InsertModel
        ref={insertModelRef}
        addColumns={editContextValue.onAddColumns}
        addEntries={editContextValue.onAddEntry}
      />
      <ContextMenu
        ref={contextMenuRef}
        options={context_menu_options}
        onAction={onContextMenuAction}
      />
      <ColumnSettingModal ref={columnSettingRef} onOk={onColumnSettingOK} />
      <VcTable
        ref={vcTableRef}
        corner={
          <Fragment>
            <span className={styles["corner-title"]}></span>
            <div className={styles["corner-cell"]}>序号</div>
          </Fragment>
        }
        headHeight={60}
        indexWidth={editContextValue.showRowCount ? 75 : 0}
        columns={columns}
        rows={editContextValue.entries}
        onSelection={onSelection}
        onColumnSize={(c, width) =>
          onColumnSettingOK(columns[c].code, { width })
        }
        onRowSize={(i, height) => {
          onEntryChange(editContextValue.entries[i].id, { height });
        }}
        onContextMenu={onTdContextMenu}
        onCopy={editContextValue.onCopy}
        onPaste={editContextValue.onPaste}
        headRender={(c, opts) => {
          const column = columns[c];
          const { selection = false } = opts || {};
          return (
            <Fragment>
              <CodeRender column={column} />
              <ColumnRender
                onSetting={onSetting}
                selection={selection}
                column={column}
              />
            </Fragment>
          );
        }}
      >
        {(c, r, s) => {
          const column = columns[c];
          const entry = editContextValue.entries[r];
          return (
            <MetaCell
              value={entry.values[column.code] || ""}
              column={column}
              selected={s}
              index={r}
              entry={entry}
              onChange={(val) => {
                onEntryChange(entry.id, {
                  values: {
                    [column.code]: val,
                  },
                });
              }}
            />
          );
        }}
      </VcTable>
    </div>
  );
};

export default EditableTable;

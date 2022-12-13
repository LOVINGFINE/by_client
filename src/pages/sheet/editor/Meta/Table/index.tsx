/*
 * Created by zhangq on 2022/08/09
 * EditableTable
 */
import { FC, MouseEvent, useRef, useContext, useEffect } from "react";
import VcTable from "./components";
import CodeRender from "../Column/Code";
import { Selection } from "@/pages/sheet/editor/type";
import {
  VcTableCore,
  ContextMenuKey,
  VcEntry,
  VcColumn,
  ColumnPayload,
  MetaEntry,
} from "../type";
import { mouseEventContent } from "@/plugins/event";
import ContextMenu from "../ContextMenu";
import Cell from "../Cell";
import { editorContext } from "../index";
import ColumnRender from "../Column";
import ColumnSettingModal, {
  ColumnSettingModalRef,
} from "../Column/SettingModal";
import InsertModel, { InsertModelRef, RowColumnMode } from "../Modals";

const EditableTable: FC = () => {
  const vcTableRef = useRef<VcTableCore>(null);
  const insertModelRef = useRef<InsertModelRef | null>(null);
  const columnSettingRef = useRef<ColumnSettingModalRef>(null);
  /** @State */
  const editContextValue = useContext(editorContext);

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
    const {
      COPY,
      PASTE,
      CLEAR,
      INSERT_COLUMN,
      REMOVE_COLUMN,
      REMOVE_ENTRY,
      INSERT_ENTRY,
    } = ContextMenuKey;
    const onMenuAction = (k: ContextMenuKey, opts: unknown) => {
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
          editContextValue.onClear(opts as boolean);
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
    };

    mouseEventContent(
      e,
      <ContextMenu
        selection={editContextValue.selection}
        onAction={onMenuAction}
      />
    );
  }

  function openInsertModal(type: RowColumnMode) {
    if (insertModelRef.current) {
      insertModelRef.current.mount(type);
    }
  }
  function onSetting(c: VcColumn) {
    columnSettingRef.current?.mount(c);
  }

  function onColumnSettingOK(code: string, column: Partial<ColumnPayload>) {
    editContextValue.onColumn(code, column);
  }

  function onAddRow() {
    editContextValue.onAddEntry([{}]);
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
      <ColumnSettingModal ref={columnSettingRef} onOk={onColumnSettingOK} />
      <VcTable
        ref={vcTableRef}
        onAddRow={onAddRow}
        showRowCount={editContextValue.showRowCount}
        columns={editContextValue.columns}
        entries={editContextValue.entries}
        onSelection={onSelection}
        onColumnSize={(c, width) => onColumnSettingOK(c, { width })}
        onRowSize={(id, height) => {
          onEntryChange(id, { height });
        }}
        onTdContextMenu={onTdContextMenu}
        onCopy={editContextValue.onCopy}
        onPaste={editContextValue.onPaste}
        codeRender={(column) => <CodeRender column={column} />}
        columnRender={(column) => (
          <ColumnRender onSetting={onSetting} column={column} />
        )}
      >
        {(column: VcColumn, entry: VcEntry) => {
          return (
            <Cell
              value={entry.values[column.code] || ""}
              column={column}
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

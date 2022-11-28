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
} from "../type";
import { mouseEventContent } from "@/plugins/event";
import ContextMenu from "../ContextMenu";
import Cell from "../Cell";
import { editorContext } from "../index";
import ColumnRender from "../Column";
import ColumnSettingModal, {
  ColumnSettingModalRef,
} from "../Column/components/SettingModal";

const EditableTable: FC = () => {
  const vcTableRef = useRef<VcTableCore>(null);
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
      // INSERT_COLUMN,
      // INSERT_ENTRY,
      // REMOVE_COLUMN,
      // REMOVE_ENTRY,
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

  function onSetting(c: VcColumn) {
    columnSettingRef.current?.mount(c);
  }

  function onColumnSettingOK(code: string, column: Partial<ColumnPayload>) {
    editContextValue.onColumn(code, column);
  }

  function onAddRow() {
    editContextValue.onAddEntry([{}]);
  }

  /** @render */
  return (
    <div
      style={{
        height: `calc(100% - 88px)`,
      }}
    >
      <ColumnSettingModal ref={columnSettingRef} onOk={onColumnSettingOK} />
      <VcTable
        ref={vcTableRef}
        onAddRow={onAddRow}
        showRowCount={editContextValue.showRowCount}
        columns={editContextValue.columns}
        entries={editContextValue.entries}
        onSelection={onSelection}
        onColumnSize={(c, width) => onColumnSettingOK(c, { width })}
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
                editContextValue.onChange({
                  [entry.id]: {
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

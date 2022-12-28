/*
 * Created by zhangq on 2022/08/09
 * MetaTable
 */
import { FC, MouseEvent, useRef, Fragment, useState } from "react";
import styles from "./style.less";
import VcTable, {
  init_selection,
  Selection,
  SimpleValue,
} from "../../components/VcTable";
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
  MetaConfigure,
  EntryPayload,
  MetaClipboard,
} from "../type";
import { context_menu_options } from "../final";
import {
  getClearBySelection,
  MetaValue,
  onCopyToClipboard,
  onPasteByClipboard,
} from "../utils";

const MetaTable: FC<MetaTableProps> = (props) => {
  const insertModelRef = useRef<InsertModelRef | null>(null);
  const columnSettingRef = useRef<ColumnSettingModalRef>(null);
  const contextMenuRef = useRef<ContextMenuRef>(null);
  /** @State */
  const {
    entries,
    selection,
    configure,
    onSelection,
    onAddColumn,
    onColumn,
    onAddEntries,
    onEntries,
    onRemoveColumn,
    onRemoveEntries,
  } = props;
  const [clipboard, setClipboard] = useState<MetaClipboard | null>(null);
  const columns: MetaColumnWithMetaValue[] = props.columns.map((ele) => {
    return {
      ...ele,
      metaValue: new MetaValue(ele.code, ele.type, ele.meta),
    };
  });
  /**
   * @Methods
   */

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
        onCopy();
        break;
      }
      case PASTE: {
        onPaste();
        break;
      }
      case CLEAR: {
        const payload = getClearBySelection(columns, entries, selection);
        onEntries(payload);

        break;
      }
      case INSERT_COLUMN: {
        openInsertModal(RowColumnMode.column);
        break;
      }
      case REMOVE_COLUMN: {
        const codes: string[] = [];
        for (let i = selection.column.start; i <= selection.column.end; i++) {
          if (columns[i]) {
            codes.push(columns[i].code);
          }
        }
        onRemoveColumn(codes);
        setTimeout(() => {
          onSelection({ ...init_selection });
        });
        break;
      }
      case REMOVE_ENTRY: {
        const ids: string[] = [];
        for (let i = selection.row.start; i <= selection.row.end; i++) {
          if (entries[i]) {
            ids.push(entries[i].id);
          }
        }
        onRemoveEntries(ids);
        setTimeout(() => {
          onSelection({ ...init_selection });
        });
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
    onColumn(code, column);
  }

  function onEntryChange(id: string, v: Partial<MetaEntry>) {
    const payload: Partial<MetaEntry> = {};
    if (v.height !== undefined) {
      payload["height"] = v.height;
    }
    if (v.values) {
      payload["values"] = v.values;
    }
    onEntries({
      [id]: payload,
    });
  }

  function onCopy() {
    setClipboard(onCopyToClipboard(columns, entries, selection));
  }

  function onPaste() {
    if (clipboard) {
      const payload = onPasteByClipboard(
        columns,
        entries,
        selection,
        clipboard
      );
      onEntries(payload);
    }
  }
  /** @render */
  function renderCell(c: number, r: number, s: boolean) {
    const column = columns[c];
    const entry = entries[r];
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
  }
  return (
    <div
      style={{
        height: `calc(100% - 100px)`,
      }}
    >
      <InsertModel
        ref={insertModelRef}
        addColumns={onAddColumn}
        addEntries={onAddEntries}
      />
      <ContextMenu
        ref={contextMenuRef}
        options={context_menu_options}
        onAction={onContextMenuAction}
      />
      <ColumnSettingModal ref={columnSettingRef} onOk={onColumnSettingOK} />
      <VcTable
        corner={
          <Fragment>
            <span className={styles["corner-title"]}></span>
            <div className={styles["corner-cell"]}>序号</div>
          </Fragment>
        }
        selection={selection}
        headHeight={60}
        indexWidth={configure.showRowCount ? 75 : 0}
        columns={columns}
        rows={entries}
        onSelection={onSelection}
        onColumnSize={(c, width) =>
          onColumnSettingOK(columns[c].code, { width })
        }
        onRowSize={(i, height) => {
          onEntryChange(entries[i].id, { height });
        }}
        onContextMenu={onTdContextMenu}
        onCopy={onCopy}
        onPaste={onPaste}
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
        {renderCell}
      </VcTable>
    </div>
  );
};

export interface MetaTableProps {
  configure: MetaConfigure;
  columns: MetaColumn[];
  entries: MetaEntry[];
  selection: Selection;
  onSelection(e: Selection): void;
  onColumn(c: string, p: Partial<ColumnPayload>): void;
  onAddColumn(o: Partial<MetaColumn>[]): void;
  onRemoveColumn(s: string[]): void;
  onEntries(e: EntryPayload): void;
  onAddEntries(e: { [k: string]: SimpleValue }[]): void;
  onRemoveEntries(s: string[]): void;
}

export default MetaTable;

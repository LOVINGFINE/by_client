/*
 * Created by zhangq on 2022/08/09
 * EditableTable
 */
import { FC, MouseEvent, useRef, useContext, useEffect } from "react";
import VcTable from "./components";
import CodeRender from "../Column/Code";
import { Selection } from "@/pages/sheet/editor/type";
import { VcTableCore, CellMenuKey, VcEntry, VcColumn } from "../type";
import { mouseEventContent } from "@/plugins/event";
import Cell, { CellContextMenu } from "../Cell";
import { editorContext } from "../index";
import ColumnRender from "../Column";

const EditableTable: FC = () => {
  const vcTableRef = useRef<VcTableCore>(null);
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
    } = CellMenuKey;
    const onMenuAction = (k: CellMenuKey, opts: unknown) => {
      switch (k) {
        case COPY: {
          editContextValue.onCopy();
          break;
        }
        case PASTE: {
          if (opts) {
            editContextValue.onPaste();
          } else {
            editContextValue.onCutPaste();
          }
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
      <CellContextMenu
        selection={editContextValue.selection}
        onAction={onMenuAction}
      />
    );
  }

  function onColumnSize(code: string, width: number) {
    editContextValue.onColumn(code, {
      width,
    });
  }

  /** @render */
  return (
    <div style={{ height: `calc(100% - 88px)` }}>
      <VcTable
        ref={vcTableRef}
        showRowCount={editContextValue.showRowCount}
        columns={editContextValue.columns}
        entries={editContextValue.entries}
        onSelection={onSelection}
        onColumnSize={onColumnSize}
        onTdContextMenu={onTdContextMenu}
        onCopy={editContextValue.onCopy}
        onPaste={editContextValue.onPaste}
        onCutPaste={editContextValue.onCutPaste}
        codeRender={(column) => <CodeRender column={column} />}
        columnRender={(column) => <ColumnRender column={column} />}
      >
        {(column: VcColumn, entry: VcEntry) => {
          return (
            <Cell
              value={entry.values[column.code] || ""}
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

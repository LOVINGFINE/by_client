/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, MouseEvent, useRef, useContext, useEffect } from "react";
import styles from "./style.less";
import VcTable from "./components";
import { Selection, SimpleValue } from "@/pages/sheet/editor/type";
import { VcTableCore, CellMenuKey } from "../type";
import { mouseEventContent } from "@/plugins/event";
import Cell, { CellContextMenu } from "../Cell";
import { editorContext } from "../index";

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
      INSERT_COLUMN,
      INSERT_ENTRY,
      REMOVE_COLUMN,
      REMOVE_ENTRY,
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

  /** render */
  function render(x: number, y: number) {
    const values = editContextValue.entries[y].values || {};
    const entryId = editContextValue.entries[y].id;
    const code = editContextValue.columns[x].code;
    const value = values[code] || "";
    const onChange = (val: SimpleValue) => {
      editContextValue.onChange(entryId, {
        [code]: val,
      });
    };
    return <Cell x={x} y={y} value={value} onChange={onChange} />;
  }
  return (
    <div className={styles["excelTable"]}>
      <VcTable
        ref={vcTableRef}
        columns={editContextValue.columns}
        entries={editContextValue.entries}
        onSelection={onSelection}
        onColumnSize={onColumnSize}
        onTdContextMenu={onTdContextMenu}
        onCopy={editContextValue.onCopy}
        onPaste={editContextValue.onPaste}
        onCutPaste={editContextValue.onCutPaste}
        columnRender={(e) => <div>{e.title}</div>}
        codeRender={(e) => <div>{e.code}</div>}
      >
        {render}
      </VcTable>
    </div>
  );
};

export default EditableTable;

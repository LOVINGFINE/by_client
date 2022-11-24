/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, MouseEvent, useRef, useContext, useEffect } from "react";
import styles from "./style.less";
import { mouseEventContent } from "@/plugins/event";
import { Selection, SimpleValue } from "@/pages/sheet/editor/type";
import VcTable from "./components";
import { CellMenuKey } from "../type";
import Cell, { CellContextMenu } from "../Cell";
import { editorContext } from "../index";
import { getKeyByCoord } from "../core";

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
      INSERT_ROW,
      REMOVE_COLUMN,
      REMOVE_ROW,
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
        case INSERT_COLUMN: {
          editContextValue.onAddColumns(opts);
          break;
        }
        case INSERT_ROW: {
          editContextValue.onAddRows(opts);
          break;
        }
        case REMOVE_COLUMN: {
          editContextValue.onAddColumns(opts);
          break;
        }
        case REMOVE_ROW: {
          editContextValue.onAddRows(opts);
          break;
        }
      }
    };
    console.log(e);

    mouseEventContent(
      e,
      <CellContextMenu
        selection={editContextValue.selection}
        onAction={onMenuAction}
      />
    );
  }

  function onColumnSize(index: number, width: number) {
    editContextValue.onColumns({
      [`${index}`]: {
        width,
      },
    });
  }

  function onRowSize(index: number, height: number) {
    editContextValue.onRows({
      [`${index}`]: {
        height,
      },
    });
  }

  /** render */
  function render(x: number, y: number) {
    const key = getKeyByCoord(x, y);
    const value = editContextValue.data[key]?.value || "";
    const style = editContextValue.data[key]?.style || {};
    const onChange = (val: SimpleValue) => {
      editContextValue.onChange({
        [key]: {
          value: val,
        },
      });
    };
    return <Cell x={x} y={y} value={value} style={style} onChange={onChange} />;
  }
  return (
    <div className={styles["excelTable"]}>
      <VcTable
        ref={vcTableRef}
        columns={editContextValue.columns}
        rows={editContextValue.rows}
        onSelection={onSelection}
        onColumnSize={onColumnSize}
        onRowSize={onRowSize}
        onTdContextMenu={onTdContextMenu}
        onCopy={editContextValue.onCopy}
        onPaste={editContextValue.onPaste}
        onCutPaste={editContextValue.onCutPaste}
      >
        {render}
      </VcTable>
    </div>
  );
};

export interface VcTableCore {
  onSelection(e: Selection): void;
  deSelection(): void;
}

export default EditableTable;
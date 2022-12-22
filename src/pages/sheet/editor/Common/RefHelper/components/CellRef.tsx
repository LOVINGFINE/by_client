/*
 * Created by zhangq on 2022/09/15
 * selection ref
 */
import { FC, useEffect, useState, useRef, KeyboardEvent } from "react";
import styles from "../style.less";
import { SimpleValue, Selection } from "../../../components/VcTable";
import { getCodeByIndex } from "@/plugins/convert";
import { getRefCellInputStyle } from "../../Cell/utils";
import { INIT_CELL } from "../../final";
import { getKeyByCoord } from "../../core";
import { Cell, WorkbookCommonData } from "../../type";

const CellRef: FC<CellRefProps> = ({ selection, onChange, data }) => {
  /** @State */
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<SimpleValue>("");
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState<{
    x: number;
    y: number;
  }>({
    x: -1,
    y: -1,
  });

  const label = (() => {
    if (current.x > -1 && current.y > -1) {
      return `${getCodeByIndex(current.x)}${current.y + 1}`;
    }
    return "";
  })();

  const style = (() => {
    const { x, y } = current;
    const key = getKeyByCoord(x, y);
    if (data[key]) {
      return getRefCellInputStyle(data[key]?.style);
    }
    return getRefCellInputStyle(INIT_CELL.style);
  })();

  useEffect(() => {
    const x = selection.column.current;
    const y = selection.row.current;
    const key = getKeyByCoord(x, y);
    setCurrent({
      x,
      y,
    });
    if (data[key]) {
      setInput(data[key].value);
    } else {
      setInput("");
    }
  }, [selection, editing]);

  /**
   * @Methods
   */
  function onFocus() {
    setEditing(true);
  }

  function onBlur() {
    setEditing(false);
    onValueChange();
  }

  function onValueChange() {
    const { x, y } = current;
    const key = getKeyByCoord(x, y);
    if (x > -1 && y > -1 && data[key]?.value !== input) {
      // 修改
      onChange({
        [key]: { value: input },
      });
    }
  }

  function onInput(e: React.FormEvent<HTMLInputElement>) {
    setInput(e.currentTarget.value);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.code === "Enter") {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }
  /** @render */
  return (
    <div className={styles["ref-cell"]}>
      <div className={styles["ref-cell-label"]}>{label || ""}</div>
      {label && (
        <input
          ref={inputRef}
          className={styles["textInput"]}
          style={{
            flex: 1,
            height: "100%",
            ...style,
          }}
          value={`${input}`}
          onInput={onInput}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
      )}
    </div>
  );
};

export interface CellRefProps {
  selection: Selection;
  data: WorkbookCommonData;
  onChange(e: { [k: string]: Partial<Cell> }): void;
}

export default CellRef;

/*
 * Created by zhangq on 2022/09/15
 * selection ref
 */
import {
  FC,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  useContext,
} from "react";
import styles from "../style.less";
import { SimpleValue } from "@/packages/table";
import { getCodeByIndex } from "@/plugins/convert";
import { editorContext } from "../../index";
import { getRefCellInputStyle } from "../../Cell/utils";
import { INIT_CELL } from "../../final";
import { getKeyByCoord } from "../../core";

const CellRef: FC = () => {
  const editContextValue = useContext(editorContext);
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
    if (editContextValue.data[key]) {
      return getRefCellInputStyle(editContextValue.data[key]?.style);
    }
    return getRefCellInputStyle(INIT_CELL.style);
  })();

  useEffect(() => {
    const x = editContextValue.selection.column.current;
    const y = editContextValue.selection.row.current;
    const key = getKeyByCoord(x, y);
    setCurrent({
      x,
      y,
    });
    if (editContextValue.data[key]) {
      setInput(editContextValue.data[key].value);
    } else {
      setInput("");
    }
  }, [editContextValue.selection, editing]);

  /**
   * @Methods
   */
  function onFocus() {
    setEditing(true);
  }

  function onBlur() {
    setEditing(false);
    onChange();
  }

  function onChange() {
    const { x, y } = current;
    const key = getKeyByCoord(x, y);
    if (x > -1 && y > -1 && editContextValue.data[key]?.value !== input) {
      // 修改
      editContextValue.onChange({
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

export default CellRef;

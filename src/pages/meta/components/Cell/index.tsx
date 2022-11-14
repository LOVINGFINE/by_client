/*
 * Created by zhangq on 2022/08/09
 * meta table Cell
 */
import { FC, useEffect, useState, useRef, KeyboardEvent } from "react";
import { SimpleData } from "@/packages/table";
import styles from "./style.less";

const Cell: FC<CellProps> = ({ entry, onChange, onContextMenu }) => {
  /** @State */
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");

  /**
   * @Methods
   */
  function onDoubleClick() {
    setEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.select();
        inputRef.current.focus();
      } else {
        setEditing(false);
      }
    });
  }

  function onBlur() {
    setEditing(false);
    if (entry.value !== input && onChange) {
      onChange(input);
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.code === "Enter") {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }

  function onInput(e: React.FormEvent<HTMLInputElement>) {
    setInput(e.currentTarget.value);
  }

  /** @Effect */
  useEffect(() => {
    setInput(`${entry.value}`);
  }, [entry.value]);
  /** render */
  return (
    <div
      className={styles.cell}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      <input
        ref={inputRef}
        className={styles["cell-input"]}
        style={{
          display: editing ? "block" : "none",
        }}
        value={input}
        onInput={onInput}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {!editing && <span>{input}</span>}
    </div>
  );
};

/**
 * @interface CellProps
 */
export interface CellProps {
  entry: {
    value: SimpleData;
  };
  onChange?(e: SimpleData): void;
  onContextMenu?(e: React.MouseEvent): void;
}

export default Cell;

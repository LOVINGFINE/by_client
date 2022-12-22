/*
 * Created by zhangq on 2022/09/15
 * selection ref
 */
import { FC, useEffect, useState, useRef, KeyboardEvent } from "react";
import styles from "../style.less";
import { Selection } from "../../../components/VcTable";
import { getRefBySelection, getSelectionByRef } from "../utils";

const SelectionRef: FC<SelectionRefProps> = ({ onSelection, selection }) => {
  /** @State */
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  /** @Effect */
  useEffect(() => {
    const target = getRefBySelection(selection);
    if (value !== target) {
      setValue(target);
    }
  }, [selection]);

  /**
   * @Methods
   */
  function onFocus() {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }

  function onBlur() {
    const target = getRefBySelection(selection);
    if (value !== target) {
      const selection = getSelectionByRef(value);
      if (selection) {
        onSelection(selection);
      }
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
    setValue(e.currentTarget.value);
  }

  /** @render */
  return (
    <input
      ref={inputRef}
      className={styles["textInput"]}
      style={{
        width: 95,
        height: "100%",
      }}
      value={value}
      onInput={onInput}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    />
  );
};

interface SelectionRefProps {
  selection: Selection;
  onSelection(e: Selection): void;
}

export default SelectionRef;

/*
 * Created by zhangq on 2022/08/09
 * Workbook Cell
 */
import React, { FC, useRef } from "react";
import styles from "./style.less";
import { SimpleValue } from "@/pages/sheet/editor/type";
import TextInput, { TextInputCore } from "../TextInput";
import CellContextMenu from "./Menu";

const Cell: FC<CellProps> = ({ value, onChange }) => {
  const inputRef = useRef<TextInputCore>(null);

  function onDoubleClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  /** render */
  return (
    <div className={styles["cell"]} onDoubleClick={onDoubleClick}>
      <TextInput ref={inputRef} style={{}} value={value} onChange={onChange} />
    </div>
  );
};

/**
 * @interface CellProps
 */
export interface CellProps {
  x: number;
  y: number;
  value: SimpleValue;
  onChange?(e: SimpleValue): void;
}

export { CellContextMenu };
export default Cell;

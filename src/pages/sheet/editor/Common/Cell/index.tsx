/*
 * Created by zhangq on 2022/08/09
 * Workbook Cell
 */
import React, { FC, useRef } from "react";
import styles from "./style.less";
import { SimpleValue } from "@/pages/sheet/editor/type";
import TextInput, { TextInputCore } from "../TextInput";
import CellContextMenu from "./Menu";
import { getCellStyle } from "./utils";
import { StyleOption } from "../type";

const Cell: FC<CellProps> = ({ value, onChange, style }) => {
  const inputRef = useRef<TextInputCore>(null);

  function onDoubleClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  /** render */
  return (
    <div className={styles["cell"]} onDoubleClick={onDoubleClick}>
      <TextInput
        ref={inputRef}
        style={getCellStyle(style)}
        value={value}
        onChange={onChange}
      />
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
  style: StyleOption;
}

export { CellContextMenu };
export default Cell;

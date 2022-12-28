/*
 * Created by zhangq on 2022/08/09
 * Workbook CellRender
 */
import React, { FC, useRef } from "react";
import styles from "./style.less";
import { SimpleValue } from "../../components/VcTable";
import TextInput, { TextInputCore } from "../../components/TextInput";
import { getCellStyle } from "./utils";
import { CellStyle } from "../type";

const CellRender: FC<CellRenderProps> = ({ value, onChange, style }) => {
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
 * @interface CellRenderProps
 */
export interface CellRenderProps {
  x: number;
  y: number;
  value: SimpleValue;
  onChange?(e: SimpleValue): void;
  style: CellStyle;
}

export default CellRender;

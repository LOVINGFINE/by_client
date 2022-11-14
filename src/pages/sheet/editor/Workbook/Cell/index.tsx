/*
 * Created by zhangq on 2022/08/09
 * EXCEL ExcelCell
 */
import { FC, useEffect, useState, useRef, CSSProperties } from "react";
import styles from "./style.less";
import { SimpleData } from "../Table";
import TextInput, { TextInputCore } from "../TextInput";
import ExcelCellContextMenu from "./Menu";
import { getCellStyle } from "./utils";
import { StyleOption } from "../type";

const ExcelCell: FC<ExcelCellProps> = ({ value, onChange, style }) => {
  /**
   * @Methods
   */
  function onValChange(val: SimpleData) {
    if (value !== val && onChange) {
      onChange(val);
    }
  }

  /** render */
  return (
    <div
      className={styles["cell"]}
      style={{
        background: style.background,
      }}
    >
      <TextView
        value={value}
        style={getCellStyle(style)}
        onChange={onValChange}
      />
    </div>
  );
};

const TextView: FC<TextViewProps> = ({ value, onChange, style = {} }) => {
  /** @State */
  const inputRef = useRef<TextInputCore>(null);
  const [editing, setEditing] = useState(false);
  /**
   * @Methods
   */
  function onValChange(val: SimpleData) {
    if (value !== val && onChange) {
      onChange(val);
    }
  }

  function onDoubleClick() {
    setEditing(true);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, editing]);

  return editing ? (
    <TextInput
      ref={inputRef}
      style={{
        width: "100%",
        ...style,
      }}
      onBlur={() => setEditing(false)}
      value={value}
      onChange={onValChange}
    />
  ) : (
    <div
      className={styles["text"]}
      style={{ ...style }}
      onDoubleClick={onDoubleClick}
    >
      {value}
    </div>
  );
};

/**
 * @interface TextViewProps
 */
export interface TextViewProps {
  value: SimpleData;
  onChange?(e: SimpleData): void;
  style?: CSSProperties;
}

/**
 * @interface ExcelCellProps
 */
export interface ExcelCellProps {
  x: number;
  y: number;
  value: SimpleData;
  onChange?(e: SimpleData): void;
  style: StyleOption;
}

export { ExcelCellContextMenu };
export default ExcelCell;

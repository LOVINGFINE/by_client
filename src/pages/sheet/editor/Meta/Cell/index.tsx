/*
 * Created by zhangq on 2022/08/09
 * Workbook Cell
 */
import React, { FC, useRef } from "react";
import styles from "./style.less";
import { SimpleValue } from "@/pages/sheet/editor/type";
import TextInput, { TextInputCore } from "./TextInput";
import { MetaType, VcColumn } from "../type";
import { useClassNames } from "@/packages/design/utils/style";
import { Checkbox } from "@/packages/design";

const cn = useClassNames(styles);

const Cell: FC<CellProps> = ({ value, onChange, column }) => {
  const inputRef = useRef<TextInputCore>(null);

  function onDoubleClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const render = () => {
    switch (column.type) {
      case MetaType.Boolean:
        return (
          <Checkbox onChange={onChange} checked={!!value}>
            {column.meta.boolean.label && (
              <>
                {!!value
                  ? column.meta.boolean.checked
                  : column.meta.boolean.unChecked}
              </>
            )}
          </Checkbox>
        );
      default:
        return <TextInput ref={inputRef} value={value} onChange={onChange} />;
    }
  };
  /** render */
  return (
    <div
      className={cn(["cell", `cell-${column.type.toLowerCase()}`])}
      onDoubleClick={onDoubleClick}
    >
      {render()}
    </div>
  );
};

/**
 * @interface CellProps
 */
export interface CellProps {
  value: SimpleValue;
  column: VcColumn;
  onChange?(e: SimpleValue): void;
}

export default Cell;

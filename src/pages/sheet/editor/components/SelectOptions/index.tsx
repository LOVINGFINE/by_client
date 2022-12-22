/*
 * Created by zhangq on 2022/04/03
 * SelectOptionsPicker 组件
 */

import { CSSProperties, FC, useRef, useState } from "react";
import styles from "./style.less";
import { getStyles } from "./utils";
import { SimpleValue } from "../VcTable";
import ReactDOM from "react-dom";
import SelectContent from "./Content";
import { Icon } from "@/packages/design";

const SelectOptionsPicker: FC<SelectOptionsPickerProps> = ({
  placement = "bottom",
  value,
  onChange,
  options = [],
  multiple = false,
  enabled,
}) => {
  const [visible, setVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const renderStyles = getStyles(selectRef.current, placement);

  const selects = (() => {
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  })();

  const selectedElement = (() => {
    return options
      .filter((e) => selects.includes(e.value))
      .map((ele, i) => {
        return (
          <span
            key={i}
            className={styles["options-currentTag"]}
            style={ele.style}
          >
            {ele.value}
          </span>
        );
      });
  })();

  /**
   * @method
   */

  function onOpen() {
    setVisible(true);
    setTimeout(() => {
      window.addEventListener("mouseup", onClose, { once: true });
    });
  }

  function onClose() {
    setVisible(false);
    window.removeEventListener("mouseup", onClose);
  }

  function onVisible() {
    if (!visible) {
      onOpen();
    } else {
      onClose();
    }
  }

  function onItem(v: SimpleValue) {
    onChange && onChange(v);
    onClose();
  }
  /** render */
  return (
    <div className={styles["options"]} ref={selectRef}>
      {visible &&
        ReactDOM.createPortal(
          <SelectContent
            style={renderStyles}
            multiple={multiple}
            selects={selects}
            options={options}
            onChange={onItem}
          />,
          document.body
        )}
      {selectedElement}
      {enabled && (
        <Icon
          onClick={onVisible}
          name="caret-down"
          className={styles["options-down"]}
        />
      )}
    </div>
  );
};

export interface SelectOptionsPickerProps {
  placement?: "bottom" | "top";
  value: SimpleValue | SimpleValue[];
  options?: OptionsSelect[];
  multiple?: boolean;
  enabled: boolean;
  onChange?(v: SimpleValue | SimpleValue[]): void;
}

export interface OptionsSelect {
  value: SimpleValue;
  style: CSSProperties;
}

export default SelectOptionsPicker;

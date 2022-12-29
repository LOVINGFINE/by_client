/*
 * Created by zhangq on 2022/04/03
 * Select 组件
 */
import ReactDOM from "react-dom";
import React, { ReactElement, FC, useRef, useState } from "react";
import { classNames } from "@/tools/style";
import Option, { SelectOption } from "./Option";
import "./style.less";
import { getStyles } from "./utils";

const Select: FC<SelectProps> = ({
  width = "100%",
  placement = "bottom",
  size = "middle",
  search,
  value,
  onChange,
  options = [],
}: SelectProps): ReactElement => {
  const [visible, setVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const overlayRenderStyles = (() => {
    return getStyles(selectRef.current, placement);
  })();

  const selected = (() => {
    const current = options.find((ele) => ele.value === value);
    if (current) {
      return (
        <div className={classNames(["select-option", `select-option-${size}`])}>
          {current.icon}
          <span>{current.label}</span>
        </div>
      );
    }
  })();
  /**
   * @method
   */
  function onItemSelect(val: string | number) {
    onChange && onChange(val);
    onClose();
  }

  function onOpen() {
    setVisible(true);
    setTimeout(() => {
      window.addEventListener("mouseup", onClose, { once: true });
    });
  }

  function onClose() {
    setVisible(false);
  }

  function onVisible(e: React.MouseEvent) {
    e.stopPropagation();
    if (!visible) {
      onOpen();
    } else {
      onClose();
    }
  }

  /** render */
  return (
    <div
      className={classNames(["select", `select-${size}`])}
      ref={selectRef}
      style={{ width }}
      onMouseUp={onVisible}
    >
      {visible &&
        ReactDOM.createPortal(
          <div className="select-content" style={overlayRenderStyles}>
            <div
              className="select-items"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
            >
              {options.map((ele, i) => {
                return (
                  <Option
                    onClick={onItemSelect}
                    selected={value === ele.value}
                    size={size}
                    key={i}
                    {...ele}
                  />
                );
              })}
              {options.length === 0 && <li className="select-items-empty"></li>}
            </div>
          </div>,
          document.body
        )}
      {selected}
      <input
        ref={inputRef}
        className={classNames([
          "select-input",
          `select-input-search-${!!search}`,
        ])}
      />
    </div>
  );
};

/**
 * @interface props
 */
export interface OffsetProp {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface SelectProps {
  search?: boolean;
  width?: number | string;
  placement?: "bottom" | "top";
  size?: "large" | "middle" | "small";
  value?: string | number | boolean;
  onChange?(v: string | number): void;
  options?: SelectOption[];
}

export default Select;

/*
 * Created by zhangq on 2022/04/03
 * Select 组件
 */

import React, { ReactElement, FC, useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { covClass } from "@/plugins/style";
import Option, { SelectOption } from "./Option";
import "./style.less";
import { setStyles } from "./utils";

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
  const inner = useRef<HTMLDivElement | null>();
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [offset, setOffset] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const overlay = (
    <div className="select-items" onMouseDown={(e) => e.stopPropagation()}>
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
  );

  const selected = (() => {
    const current = options.find((ele) => ele.value === value);
    if (current) {
      return (
        <div className={covClass(["select-option", `select-option-${size}`])}>
          {current.icon}
          <span>{current.label}</span>
        </div>
      );
    }
  })();

  useEffect(() => {
    if (selectRef.current) {
      const {
        offsetHeight = 0,
        offsetWidth = 0,
        offsetTop = 0,
        offsetLeft = 0,
      } = selectRef.current;
      setOffset({
        width: offsetWidth,
        height: offsetHeight,
        left: offsetLeft,
        top: offsetTop,
      });
    }
  }, [selectRef.current]);

  useEffect(() => {
    if (visible) {
      const div = document.createElement("div");
      div.className = "select-content";
      div.style.opacity = "0";
      div.style.width = `${offset.width}px`;
      const root = createRoot(div);
      root.render(overlay);
      setTimeout(() => {
        setStyles(div, offset, placement);
      });
      inner.current = div;
      document.body.appendChild(div);
    } else {
      if (inner.current) {
        document.body.removeChild(inner.current);
        inner.current = null;
      }
    }
  }, [visible]);
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
      window.addEventListener("mousedown", onClose);
    });
  }

  function onClose() {
    window.removeEventListener("mousedown", onClose);
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
      className={covClass(["select", `select-${size}`])}
      ref={selectRef}
      style={{ width }}
      onMouseDown={onVisible}
    >
      {selected}
      <input
        ref={inputRef}
        className={covClass([
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
  value: string | number;
  onChange?(v: string | number): void;
  options?: SelectOption[];
}

export default Select;

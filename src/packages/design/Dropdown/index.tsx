/*
 * Created by zhangq on 2022/04/03
 * Dropdown 组件
 */
import React, { ReactElement, FC, useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.less";
import { setStyles } from "./utils";

const Dropdown: FC<DropdownProps> = ({
  visible,
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
  onVisible,
}: DropdownProps): ReactElement => {
  const inner = useRef<HTMLDivElement | null>();
  const childrenRef = useRef<HTMLElement>(null);
  const childrenElement = (() => {
    if (typeof children?.type !== "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ele = children as any;
      return ele?.type(ele.props);
    }
    return children;
  })();
  const [open, setOpen] = useState<boolean>(false);

  const props: Partial<unknown> & React.Attributes = (() => {
    if (trigger === "hover") {
      return {
        onMouseEnter: onChangeVisible,
        onMouseLeave: onChangeVisible,
      };
    }
    return {
      onMouseDown: onChangeVisible,
    };
  })();

  useEffect(() => {
    if (visible !== undefined) {
      setOpen(visible);
    }
  }, [visible]);

  useEffect(() => {
    if (open) {
      onOpen();
    } else {
      if (inner.current) {
        onClose();
      }
    }
  }, [open]);
  /**
   * @method
   */
  function onOpen() {
    const div = document.createElement("div");
    div.className = "dropdown";
    div.style.opacity = "0";
    div.onclick = (e) => e.stopPropagation();
    const root = createRoot(div);
    const content = <div className="dropdown-overlay">{overlay}</div>;
    root.render(content);
    setTimeout(() => {
      setStyles(div, childrenRef.current, placement);
    });
    inner.current = div;
    document.body.appendChild(div);
    setTimeout(() => {
      if (trigger === "click") {
        window.addEventListener("mousedown", onChangeVisible, { once: true });
      }
    });
  }

  function onClose() {
    if (inner.current) {
      inner.current.style.opacity = "0";
      setTimeout(() => {
        if (inner.current) {
          document.body.removeChild(inner.current);
          inner.current = null;
        }
      }, 250);
    }
  }

  function onChangeVisible() {
    if (visible !== undefined) {
      onVisible && onVisible(!visible);
    } else {
      setOpen(!open);
    }
  }

  /** render */
  return React.cloneElement(childrenElement || <></>, {
    ref: childrenRef,
    ...props,
  });
};

export interface DropdownProps {
  placement?:
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | "top"
    | "topLeft"
    | "topRight";

  visible?: boolean;
  onVisible?(e: boolean): void;
  children?: ReactElement;
  overlay?: ReactElement;
  trigger?: "click" | "hover";
}

export default Dropdown;

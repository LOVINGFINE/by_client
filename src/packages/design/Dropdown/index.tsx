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
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    return onClose;
  }, []);

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getProps(ele: any) {
    if (trigger === "hover") {
      return {
        onMouseEnter: (...s: unknown[]) => {
          if (ele.props?.onMouseEnter) {
            ele.props?.onMouseEnter(s);
          }
          onChangeVisible();
        },
        onMouseLeave: (...s: unknown[]) => {
          if (ele.props?.onMouseLeave) {
            ele.props?.onMouseLeave(s);
          }
          onChangeVisible();
        },
      };
    }
    return {
      onClick: (...s: unknown[]) => {
        if (ele.props?.onClick) {
          ele.props?.onClick(s);
        }
        onChangeVisible();
      },
    };
  }

  function onOpen() {
    const div = document.createElement("div");
    div.className = "dropdown";
    div.style.opacity = "0";
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
        window.addEventListener("click", onChangeVisible, { once: true });
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
          setOpen(false);
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
  if (!children) return <></>;
  if (typeof children?.type !== "string") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ele = children as any;
    return React.cloneElement(
      ele?.type({
        ...(ele?.props || {}),
        ...getProps(ele),
      }),
      {
        ref: childrenRef,
      }
    );
  }
  return React.cloneElement(children, {
    ref: childrenRef,
    ...getProps(children),
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
